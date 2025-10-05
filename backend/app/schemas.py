from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Any, Dict

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserBase(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    full_name: Optional[str] = None

class RegisterRequest(UserBase):
    password: str
    role: str = Field(..., pattern="^(patient|doctor|pharmacy|blood_bank)$")
    aadhaar_id: Optional[str] = None
    # Doctor-specific fields
    medical_id: Optional[str] = None
    hospital_registration_id: Optional[str] = None
    # Pharmacy-specific
    pharmacy_name: Optional[str] = None
    license_id: Optional[str] = None
    # Blood bank-specific
    blood_bank_name: Optional[str] = None
    blood_bank_registration_id: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class MeResponse(UserBase):
    id: str
    role: str
    is_verified: bool

class GeoQuery(BaseModel):
    type: str = Field(..., pattern="^(hospital|pharmacy|blood_bank)$")
    lat: float
    lng: float
    radius_km: float = 10.0
    need: Optional[str] = None  # e.g., blood group or medicine name

class PrescriptionItem(BaseModel):
    drug: str
    dose: str
    freq: str
    duration: str
    notes: Optional[str] = None

class CreatePrescription(BaseModel):
    patient_id: str
    items: List[PrescriptionItem]
