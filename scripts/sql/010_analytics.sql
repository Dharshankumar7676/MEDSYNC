-- Analytics support tables

-- Appointments table
create table if not exists appointments (
    id uuid primary key default gen_random_uuid(),
    patient_id uuid not null references patients(id) on delete cascade,
    doctor_id uuid not null references app_users(id) on delete restrict,
    hospital_id uuid not null references hospitals(id) on delete restrict,
    scheduled_at timestamptz not null,
    status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
    reason text,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_appointments_patient on appointments(patient_id);
create index if not exists idx_appointments_doctor on appointments(doctor_id);
create index if not exists idx_appointments_date on appointments(scheduled_at);

-- Analytics events table for tracking important events
create table if not exists analytics_events (
    id uuid primary key default gen_random_uuid(),
    event_type text not null,
    event_data jsonb,
    actor_id uuid references app_users(id) on delete set null,
    target_type text,
    target_id uuid,
    occurred_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_type on analytics_events(event_type);
create index if not exists idx_analytics_events_date on analytics_events(occurred_at);

-- Metrics table for storing aggregated statistics
create table if not exists analytics_metrics (
    id uuid primary key default gen_random_uuid(),
    metric_name text not null,
    metric_value numeric not null,
    dimensions jsonb,
    collected_at timestamptz not null default now(),
    period_start timestamptz,
    period_end timestamptz,
    unique(metric_name, dimensions, period_start, period_end)
);

create index if not exists idx_analytics_metrics_name on analytics_metrics(metric_name);
create index if not exists idx_analytics_metrics_date on analytics_metrics(collected_at);

-- Sample data for analytics
insert into analytics_events (event_type, event_data, occurred_at)
values 
    ('appointment_created', '{"patient_id": "123", "doctor_id": "456"}', now() - interval '1 day'),
    ('prescription_issued', '{"patient_id": "123", "medications": ["med1", "med2"]}', now() - interval '2 days'),
    ('blood_request_fulfilled', '{"request_id": "789", "blood_group": "O+"}', now() - interval '3 days');

-- Sample metrics
insert into analytics_metrics (metric_name, metric_value, dimensions, period_start, period_end)
values
    ('appointments_count', 150, '{"department": "cardiology"}', date_trunc('month', now()), date_trunc('month', now()) + interval '1 month'),
    ('prescriptions_filled', 85, '{"pharmacy_id": "xyz"}', date_trunc('month', now()), date_trunc('month', now()) + interval '1 month'),
    ('blood_requests_pending', 12, '{"blood_group": "all"}', date_trunc('day', now()), date_trunc('day', now()) + interval '1 day');