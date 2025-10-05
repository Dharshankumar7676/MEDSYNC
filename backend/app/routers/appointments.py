from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from ..db import run_query, get_pool
from ..deps import get_current_user, require_roles

router = APIRouter(prefix="/appointments", tags=["appointments"])

class AppointmentBody(BaseModel):
    patient_id: str
    provider_id: str
    start_time: str
    end_time: str
    notes: Optional[str] = None

@router.get("")
def list_my_appointments(user: dict = Depends(get_current_user)):
    uid = user["sub"]
    role = user["role"]
    if role == "patient":
        rows = run_query("SELECT id, patient_id, provider_id, start_time, end_time, status, notes FROM appointments WHERE patient_id=$1 ORDER BY start_time DESC", (uid,), fetch=True)
    else:
        rows = run_query("SELECT id, patient_id, provider_id, start_time, end_time, status, notes FROM appointments WHERE provider_id=$1 ORDER BY start_time DESC", (uid,), fetch=True)
    return [{"id": r[0], "patient_id": r[1], "provider_id": r[2], "start_time": r[3], "end_time": r[4], "status": r[5], "notes": r[6]} for r in rows]

@router.post("")
def create_appointment(body: AppointmentBody, user: dict = Depends(get_current_user)):
    # Providers or patients can create; enforce basic checks
    try:
        run_query(
            "INSERT INTO appointments (patient_id, provider_id, start_time, end_time, notes) VALUES ($1,$2,$3,$4,$5)",
            (body.patient_id, body.provider_id, body.start_time, body.end_time, body.notes)
        )
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/verify-doctor/{doctor_user_id}")
async def verify_doctor(doctor_user_id: str, user: dict = Depends(get_current_user)):
    # Only hospital admins or global admin can verify
    checker = require_roles("admin", "hospital")
    checker(user)
    pool = await get_pool()
    doc = await pool.fetchrow("select id from doctors where user_id=$1", doctor_user_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Doctor not found")
    await pool.execute("update doctors set is_verified=true where id=$1", doc["id"])
    await pool.execute("update app_users set is_verified=true where id=$1", doctor_user_id)
    return {"ok": True}
