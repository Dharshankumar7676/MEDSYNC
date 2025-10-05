-- Doctors profile and verification linkage to hospitals
create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  medical_id text not null,
  hospital_id uuid references hospitals(id) on delete set null,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_doctors_user on doctors(user_id);
create index if not exists idx_doctors_hospital on doctors(hospital_id);

