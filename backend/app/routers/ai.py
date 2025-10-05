from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ..db import run_query
from ..config import settings

router = APIRouter(prefix="/ai", tags=["ai"])

try:
    import google.generativeai as genai
    if settings.GEMINI_API_KEY:
        genai.configure(api_key=settings.GEMINI_API_KEY)
    _gemini_ready = bool(settings.GEMINI_API_KEY)
except Exception:
    genai = None
    _gemini_ready = False

class AISearchBody(BaseModel):
    query: str
    lat: Optional[float] = None
    lng: Optional[float] = None
    type: Optional[str] = None

@router.post("/search")
def ai_search(body: AISearchBody):
    # Basic SQL search + optional nearest sorting
    params = []
    where = []
    if body.query:
        where.append("(name ILIKE $%s OR address ILIKE $%s OR $%s = ANY(tags))" % (len(params)+1, len(params)+2, len(params)+3))
        params.extend([f"%{body.query}%", f"%{body.query}%", body.query])
    if body.type:
        where.append("type = $%s" % (len(params)+1))
        params.append(body.type)
    where_sql = f"WHERE {' AND '.join(where)}" if where else ""
    order_sql = "ORDER BY created_at DESC"
    select_sql = "SELECT id, type, name, address, phone, latitude, longitude, tags FROM resources"
    if body.lat is not None and body.lng is not None:
        select_sql = "SELECT id, type, name, address, phone, latitude, longitude, tags, haversine_km($%s,$%s,latitude,longitude) AS distance_km FROM resources" % (len(params)+1, len(params)+2)
        params.extend([body.lat, body.lng])
        order_sql = "ORDER BY distance_km ASC"
    rows = run_query(f"{select_sql} {where_sql} {order_sql} LIMIT 50", tuple(params), fetch=True)
    results = []
    for r in rows:
        entry = {
            "id": r[0], "type": r[1], "name": r[2], "address": r[3], "phone": r[4],
            "latitude": r[5], "longitude": r[6], "tags": r[7] or []
        }
        if len(r) > 8:
            entry["distance_km"] = float(r[8])
        results.append(entry)

    # Optional AI categorization/summarization
    ai_summary = None
    if _gemini_ready and genai:
        try:
            model = genai.GenerativeModel("gemini-1.5-flash")
            prompt = f"Categorize the following medical resources into high-level tags (e.g., emergency, pharmacy, blood bank, clinic) and provide a brief 2-sentence summary for query: '{body.query}'. Resources: {results[:10]}"
            resp = model.generate_content(prompt)
            ai_summary = resp.text
        except Exception as e:
            ai_summary = f"AI summary unavailable: {e}"

    return {"results": results, "ai_summary": ai_summary}

class ChatBody(BaseModel):
    message: str
    context: Optional[str] = None

@router.post("/chat")
def pulse_chat(body: ChatBody):
    if not _gemini_ready or not genai:
        raise HTTPException(status_code=400, detail="Gemini API key not configured")
    model = genai.GenerativeModel("gemini-1.5-pro")
    system = "You are Pulse, a helpful medical assistant for MedSync. Be concise and clear. You cannot diagnose; provide general guidance and suggest consulting providers."
    prompt = f"{system}\nContext: {body.context or 'N/A'}\nUser: {body.message}"
    resp = model.generate_content(prompt)
    return {"reply": resp.text}
