from sqlalchemy import Table, Column, ForeignKey, MetaData
from sqlalchemy import String, Integer, DateTime, JSON, Numeric
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

metadata = MetaData()

appointments = Table(
    "appointments",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("patient_id", UUID, ForeignKey("patients.id", ondelete="CASCADE"), nullable=False),
    Column("doctor_id", UUID, ForeignKey("app_users.id", ondelete="RESTRICT"), nullable=False),
    Column("hospital_id", UUID, ForeignKey("hospitals.id", ondelete="RESTRICT"), nullable=False),
    Column("scheduled_at", DateTime(timezone=True), nullable=False),
    Column("status", String, nullable=False, default="scheduled"),
    Column("reason", String),
    Column("notes", String),
    Column("created_at", DateTime(timezone=True), nullable=False, default=datetime.utcnow),
    Column("updated_at", DateTime(timezone=True), nullable=False, default=datetime.utcnow),
)

analytics_events = Table(
    "analytics_events",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("event_type", String, nullable=False),
    Column("event_data", JSON),
    Column("actor_id", UUID, ForeignKey("app_users.id", ondelete="SET NULL")),
    Column("target_type", String),
    Column("target_id", UUID),
    Column("occurred_at", DateTime(timezone=True), nullable=False, default=datetime.utcnow),
)

analytics_metrics = Table(
    "analytics_metrics",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("metric_name", String, nullable=False),
    Column("metric_value", Numeric, nullable=False),
    Column("dimensions", JSON),
    Column("collected_at", DateTime(timezone=True), nullable=False, default=datetime.utcnow),
    Column("period_start", DateTime(timezone=True)),
    Column("period_end", DateTime(timezone=True)),
)