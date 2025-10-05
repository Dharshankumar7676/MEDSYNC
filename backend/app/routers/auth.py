from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from ..db import run_query
from ..auth import hash_password, verify_password, create_access_token, generate_totp_secret, get_totp_uri, verify_totp_token
from ..config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterBody(BaseModel):
    email: EmailStr
    password: str
    role: str  # 'patient','doctor','hospital','blood_bank','pharmacy','admin'
    full_name: Optional[str] = None

class LoginBody(BaseModel):
    email: EmailStr
    password: str
    totp_token: Optional[str] = None

from ..auth import router  # Re-export the unified auth router based on `app_users`/`roles`
    ok = verify_totp_token(row[0][0], token)
    return {"verified": bool(ok)}

@router.get("/me")
def me(token_payload: dict = Depends(lambda authorization=Depends(): authorization)):
    # This simple endpoint is provided by frontend via /me proxy; we recommend securing via deps.get_current_user
    return {"ok": True}
