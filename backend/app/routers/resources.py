from fastapi import APIRouter, Query
from typing import Optional
from ..db import run_query

router = APIRouter(prefix="/resources", tags=["resources"])

@router.get("/nearby")
def nearby(lat: float, lng: float, type: Optional[str] = None, limit: int = 20):
    params = [lat, lng]
    where = ""
    if type:
        where = "WHERE type = $3"
        params.append(type)
    rows = run_query(
        f"""
        SELECT id, type, name, address, phone, latitude, longitude,
               haversine_km($1,$2,latitude,longitude) AS distance_km, tags
        FROM resources
        {where}
        ORDER BY distance_km
        LIMIT {limit}
        """,
        tuple(params),
        fetch=True
    )
    return [
        {
            "id": r[0], "type": r[1], "name": r[2], "address": r[3], "phone": r[4],
            "latitude": r[5], "longitude": r[6], "distance_km": float(r[7]), "tags": r[8] or []
        } for r in rows
    ]

@router.get("")
def list_resources(q: Optional[str] = None, category_id: Optional[int] = None, type: Optional[str] = None, limit: int = 50, offset: int = 0):
    clauses = []
    params = []
    if q:
        clauses.append("(name ILIKE $%s OR address ILIKE $%s OR $%s = ANY(tags))" % (len(params)+1, len(params)+2, len(params)+3))
        params.extend([f"%{q}%", f"%{q}%", q])
    if category_id:
        clauses.append("category_id = $%s" % (len(params)+1))
        params.append(category_id)
    if type:
        clauses.append("type = $%s" % (len(params)+1))
        params.append(type)
    where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
    rows = run_query(
        f"SELECT id, type, name, address, phone, latitude, longitude, tags FROM resources {where} ORDER BY created_at DESC LIMIT {limit} OFFSET {offset}",
        tuple(params), fetch=True
    )
    return [
        {"id": r[0], "type": r[1], "name": r[2], "address": r[3], "phone": r[4], "latitude": r[5], "longitude": r[6], "tags": r[7] or []}
        for r in rows
    ]
