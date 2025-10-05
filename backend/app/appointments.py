"""Appointment related database operations."""
from fastapi import HTTPException
from sqlalchemy import select, and_, or_, func
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from .models.analytics import appointments
from .analytics import log_event

def create_appointment(
    db: Session,
    patient_id: str,
    doctor_id: str,
    hospital_id: str,
    scheduled_at: datetime,
    reason: Optional[str] = None,
    notes: Optional[str] = None
) -> Dict[str, Any]:
    """Create a new appointment."""
    try:
        # Check for conflicts
        conflict = check_appointment_conflicts(
            db, doctor_id, scheduled_at
        )
        if conflict:
            raise HTTPException(
                status_code=400,
                detail="Doctor has another appointment at this time"
            )

        result = db.execute(
            appointments.insert().values(
                patient_id=patient_id,
                doctor_id=doctor_id,
                hospital_id=hospital_id,
                scheduled_at=scheduled_at,
                reason=reason,
                notes=notes
            )
        )
        db.commit()

        # Log the event
        log_event(
            db,
            "appointment_created",
            {
                "patient_id": patient_id,
                "doctor_id": doctor_id,
                "scheduled_at": scheduled_at.isoformat()
            }
        )

        return {
            "id": result.inserted_primary_key[0],
            "patient_id": patient_id,
            "doctor_id": doctor_id,
            "hospital_id": hospital_id,
            "scheduled_at": scheduled_at,
            "reason": reason,
            "notes": notes,
            "status": "scheduled"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create appointment: {str(e)}"
        )

def get_appointments(
    db: Session,
    user_id: str,
    role: str,
    status: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
) -> List[Dict[str, Any]]:
    """Get appointments based on user role and filters."""
    query = select(appointments)

    # Role-based filtering
    if role == "patient":
        query = query.where(appointments.c.patient_id == user_id)
    elif role == "doctor":
        query = query.where(appointments.c.doctor_id == user_id)

    # Status filtering
    if status:
        query = query.where(appointments.c.status == status)

    # Date range filtering
    if start_date:
        query = query.where(appointments.c.scheduled_at >= start_date)
    if end_date:
        query = query.where(appointments.c.scheduled_at < end_date)

    # Order by scheduled time
    query = query.order_by(appointments.c.scheduled_at)

    result = db.execute(query).fetchall()
    return [dict(row) for row in result]

def check_appointment_conflicts(
    db: Session,
    doctor_id: str,
    scheduled_at: datetime,
    duration_minutes: int = 30
) -> bool:
    """Check if there are any conflicting appointments."""
    start_time = scheduled_at
    end_time = scheduled_at + timedelta(minutes=duration_minutes)

    conflicts = db.execute(
        select(appointments).where(
            and_(
                appointments.c.doctor_id == doctor_id,
                appointments.c.status != "cancelled",
                or_(
                    and_(
                        appointments.c.scheduled_at >= start_time,
                        appointments.c.scheduled_at < end_time
                    ),
                    and_(
                        appointments.c.scheduled_at <= start_time,
                        appointments.c.scheduled_at + timedelta(minutes=duration_minutes) > start_time
                    )
                )
            )
        )
    ).fetchall()

    return len(conflicts) > 0

def update_appointment_status(
    db: Session,
    appointment_id: str,
    status: str,
    notes: Optional[str] = None
) -> Dict[str, Any]:
    """Update an appointment's status."""
    try:
        # Verify the appointment exists
        appointment = db.execute(
            select(appointments).where(appointments.c.id == appointment_id)
        ).fetchone()

        if not appointment:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found"
            )

        # Update the appointment
        db.execute(
            appointments.update()
            .where(appointments.c.id == appointment_id)
            .values(
                status=status,
                notes=notes if notes else appointments.c.notes,
                updated_at=func.now()
            )
        )
        db.commit()

        # Log the event
        log_event(
            db,
            f"appointment_{status}",
            {
                "appointment_id": appointment_id,
                "previous_status": appointment.status
            }
        )

        return {
            **dict(appointment),
            "status": status,
            "notes": notes if notes else appointment.notes
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update appointment: {str(e)}"
        )