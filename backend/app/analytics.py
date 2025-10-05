from datetime import datetime, timedelta
from sqlalchemy import func, select, and_
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from .db import appointments, analytics_events, analytics_metrics
from .models.analytics import analytics_events, analytics_metrics

def get_overview_stats(db: Session) -> Dict[str, int]:
    """Get overview statistics for the dashboard."""
    now = datetime.utcnow()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)

    # Appointments for today
    appointments_today = db.query(appointments).filter(
        and_(
            appointments.c.scheduled_at >= today_start,
            appointments.c.scheduled_at < today_end
        )
    ).count()

    # Pending requests and other metrics
    metrics = db.execute(
        select([
            analytics_metrics.c.metric_name,
            analytics_metrics.c.metric_value
        ]).where(
            and_(
                analytics_metrics.c.period_start >= today_start,
                analytics_metrics.c.period_end < today_end
            )
        )
    ).fetchall()

    metrics_dict = {m.metric_name: int(m.metric_value) for m in metrics}

    return {
        "appointments_today": appointments_today,
        "blood_requests_pending": metrics_dict.get("blood_requests_pending", 0),
        "prescriptions_filled": metrics_dict.get("prescriptions_filled", 0),
        "medicine_requests_pending": metrics_dict.get("medicine_requests_pending", 0)
    }

def get_appointment_trends(db: Session, days: int = 7) -> List[Dict[str, Any]]:
    """Get appointment trends for the specified number of days."""
    now = datetime.utcnow()
    start_date = now - timedelta(days=days)

    # Query appointments grouped by day
    trends = db.query(
        func.date_trunc('day', appointments.c.scheduled_at).label('date'),
        func.count().label('count')
    ).filter(
        appointments.c.scheduled_at >= start_date
    ).group_by(
        func.date_trunc('day', appointments.c.scheduled_at)
    ).all()

    return [
        {
            "date": trend.date.strftime("%Y-%m-%d"),
            "count": trend.count
        }
        for trend in trends
    ]

def get_recent_events(db: Session, limit: int = 10) -> List[Dict[str, Any]]:
    """Get recent events for the activity feed."""
    events = db.query(analytics_events).order_by(
        analytics_events.c.occurred_at.desc()
    ).limit(limit).all()

    return [
        {
            "id": str(event.id),
            "type": event.event_type,
            "description": format_event_description(event),
            "timestamp": event.occurred_at.isoformat()
        }
        for event in events
    ]

def format_event_description(event: Any) -> str:
    """Format event data into a human-readable description."""
    event_type = event.event_type
    event_data = event.event_data or {}

    if event_type == "appointment_created":
        return f"New appointment scheduled"
    elif event_type == "prescription_issued":
        med_count = len(event_data.get("medications", []))
        return f"Prescription issued with {med_count} medications"
    elif event_type == "blood_request_fulfilled":
        blood_group = event_data.get("blood_group", "unknown")
        return f"Blood request fulfilled for {blood_group}"
    else:
        return event_type.replace("_", " ").capitalize()

def log_event(
    db: Session,
    event_type: str,
    event_data: Optional[Dict] = None,
    actor_id: Optional[str] = None,
    target_type: Optional[str] = None,
    target_id: Optional[str] = None
) -> None:
    """Log an analytics event."""
    db.execute(
        analytics_events.insert().values(
            event_type=event_type,
            event_data=event_data,
            actor_id=actor_id,
            target_type=target_type,
            target_id=target_id
        )
    )
    db.commit()

def update_metric(
    db: Session,
    metric_name: str,
    metric_value: float,
    dimensions: Optional[Dict] = None,
    period_start: Optional[datetime] = None,
    period_end: Optional[datetime] = None
) -> None:
    """Update or create a metric value."""
    now = datetime.utcnow()
    if not period_start:
        period_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    if not period_end:
        period_end = period_start + timedelta(days=1)

    db.execute(
        analytics_metrics.insert().values(
            metric_name=metric_name,
            metric_value=metric_value,
            dimensions=dimensions,
            period_start=period_start,
            period_end=period_end
        ).on_conflict_do_update(
            constraint='analytics_metrics_metric_name_dimensions_period_start_period_end_key',
            set_=dict(metric_value=metric_value)
        )
    )
    db.commit()