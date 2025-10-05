import io
import qrcode
from fastapi import APIRouter, HTTPException, Response
from .db import get_pool

router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])

@router.get("/{prescription_id}/qr.png")
async def qr(prescription_id: str):
    pool = await get_pool()
    presc = await pool.fetchrow("select qr_payload from prescriptions where id=$1", prescription_id)
    if not presc:
        raise HTTPException(status_code=404, detail="Not found")
    img = qrcode.make(presc["qr_payload"])
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return Response(buf.getvalue(), media_type="image/png")
