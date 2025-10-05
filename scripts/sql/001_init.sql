-- Extensions
create extension if not exists postgis;
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Roles table (app-level roles)
create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null check (name in ('patient','doctor','pharmacy','blood_bank','admin')),
  created_at timestamptz not null default now()
);

-- Users table (can be synced with Supabase auth.users via external_id if desired)
create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  external_id uuid, -- supabase auth user id if using auth.users sync
  email text unique not null,
  phone text,
  full_name text,
  aadhaar_id text, -- optional ID verification
  is_verified boolean not null default false,
  twofa_enabled boolean not null default false,
  twofa_secret text, -- encrypted TOTP secret if enabled
  role_id uuid not null references roles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_app_users_role on app_users(role_id);

-- Patients profile
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  dob date,
  gender text,
  blood_group text check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  allergies text[],
  chronic_conditions text[],
  emergency_contact jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_patients_user on patients(user_id);

-- Hospitals / Doctors
create table if not exists hospitals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade, -- hospital admin/doctor account
  name text not null,
  registration_id text,
  address text,
  location geography(Point, 4326), -- for nearest queries
  bed_capacity int default 0,
  beds_available int default 0,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_hospitals_user on hospitals(user_id);
create index if not exists idx_hospitals_location on hospitals using gist(location);

-- Pharmacies
create table if not exists pharmacies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  name text not null,
  license_id text,
  address text,
  location geography(Point, 4326),
  created_at timestamptz not null default now()
);

create unique index if not exists idx_pharmacies_user on pharmacies(user_id);
create index if not exists idx_pharmacies_location on pharmacies using gist(location);

-- Blood Banks
create table if not exists blood_banks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  name text not null,
  address text,
  location geography(Point, 4326),
  created_at timestamptz not null default now()
);

create unique index if not exists idx_blood_banks_user on blood_banks(user_id);
create index if not exists idx_blood_banks_location on blood_banks using gist(location);

-- Blood inventory (by blood bank)
create table if not exists blood_inventory (
  id uuid primary key default gen_random_uuid(),
  blood_bank_id uuid not null references blood_banks(id) on delete cascade,
  blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units_available int not null default 0,
  updated_at timestamptz not null default now(),
  unique(blood_bank_id, blood_group)
);

-- Medicine inventory (pharmacy)
create table if not exists medicines (
  id uuid primary key default gen_random_uuid(),
  pharmacy_id uuid not null references pharmacies(id) on delete cascade,
  name text not null,
  generic_name text,
  batch_number text,
  expiry_date date,
  quantity int not null default 0,
  restock_threshold int not null default 10,
  updated_at timestamptz not null default now()
);

create index if not exists idx_medicines_pharmacy on medicines(pharmacy_id);
create index if not exists idx_medicines_name on medicines(name);

-- Medical records timeline
create table if not exists medical_records (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  created_by uuid references app_users(id),
  record_type text not null check (record_type in ('visit','report','prescription','note')),
  title text not null,
  details jsonb, -- flexible for reports/results
  attachments jsonb, -- list of file metas/urls
  created_at timestamptz not null default now()
);

create index if not exists idx_records_patient on medical_records(patient_id);

-- E-prescriptions
create table if not exists prescriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  doctor_id uuid not null references app_users(id) on delete restrict,
  pharmacy_id uuid references pharmacies(id),
  items jsonb not null, -- [{drug, dose, freq, duration, notes}]
  qr_payload text not null, -- content to encode as QR for verification
  status text not null default 'issued' check (status in ('issued','filled','cancelled')),
  issued_at timestamptz not null default now(),
  filled_at timestamptz
);

create index if not exists idx_prescriptions_patient on prescriptions(patient_id);

-- Requests: medicine & blood
create table if not exists medicine_requests (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  pharmacy_id uuid references pharmacies(id),
  prescription_id uuid references prescriptions(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected','delivered')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists blood_requests (
  id uuid primary key default gen_random_uuid(),
  requester_hospital_id uuid references hospitals(id),
  patient_id uuid references patients(id),
  blood_group text not null check (blood_group in ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units int not null default 1,
  priority text not null default 'normal' check (priority in ('normal','emergency')),
  status text not null default 'pending' check (status in ('pending','fulfilled','cancelled')),
  created_at timestamptz not null default now(),
  fulfilled_by_blood_bank_id uuid references blood_banks(id)
);

-- Audit logs
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references app_users(id),
  action text not null,
  target_type text,
  target_id uuid,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Notifications (for alerts)
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_user_id uuid not null references app_users(id) on delete cascade,
  title text not null,
  body text,
  severity text default 'info' check (severity in ('info','warning','critical','success')),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Auth passwords (backend-managed; not exposed via RLS APIs)
create table if not exists auth_passwords (
  user_id uuid primary key references app_users(id) on delete cascade,
  password_hash text not null
);

-- Seed roles
insert into roles(name)
  values ('patient'), ('doctor'), ('pharmacy'), ('blood_bank'), ('admin')
on conflict (name) do nothing;
