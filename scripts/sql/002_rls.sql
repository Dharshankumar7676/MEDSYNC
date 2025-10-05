-- Enable Row Level Security
alter table app_users enable row level security;
alter table patients enable row level security;
alter table hospitals enable row level security;
alter table pharmacies enable row level security;
alter table blood_banks enable row level security;
alter table medical_records enable row level security;
alter table prescriptions enable row level security;
alter table medicines enable row level security;
alter table blood_inventory enable row level security;
alter table medicine_requests enable row level security;
alter table blood_requests enable row level security;
alter table notifications enable row level security;

-- Example policies (adapt as needed for Supabase auth context)
-- Note: Replace auth.uid() with appropriate session UID mapping if syncing with Supabase.
-- For simplicity, here we assume app_users.external_id matches auth.uid().

-- Optional: allow service role (no JWT) full access. Comment out if not desired.
drop policy if exists app_users_service_all on app_users;
create policy app_users_service_all on app_users
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- app_users: self read/update, admin full
drop policy if exists app_users_self_read on app_users;
create policy app_users_self_read on app_users
  for select using (external_id = auth.uid() or exists(
    select 1 from app_users u
    join roles r on r.id = u.role_id
    where u.external_id = auth.uid() and r.name = 'admin'
  ));

drop policy if exists app_users_self_update on app_users;
create policy app_users_self_update on app_users
  for update using (external_id = auth.uid());

-- Allow insert for registration when current user matches provided external_id (Supabase) or service role
drop policy if exists app_users_insert on app_users;
create policy app_users_insert on app_users
  for insert with check (
    (external_id = auth.uid()) or auth.role() = 'service_role'
  );

-- patients: owner or doctor with consent (simplified owner-only read here), admin full
drop policy if exists patients_owner_read on patients;
create policy patients_owner_read on patients
  for select using (
    user_id in (select id from app_users where external_id = auth.uid())
    or exists(
      select 1 from app_users u
      join roles r on r.id = u.role_id
      where u.external_id = auth.uid() and r.name in ('doctor','admin')
    )
  );

-- medical_records: patient owner, doctor creator, admin
drop policy if exists records_owner_doctor_read on medical_records;
create policy records_owner_doctor_read on medical_records
  for select using (
    patient_id in (
      select p.id from patients p
      join app_users u on u.id = p.user_id
      where u.external_id = auth.uid()
    )
    or created_by in (select id from app_users where external_id = auth.uid())
    or exists(
      select 1 from app_users u
      join roles r on r.id = u.role_id
      where u.external_id = auth.uid() and r.name = 'admin'
    )
  );

-- prescriptions: patient owner, doctor author, pharmacy assigned, admin
drop policy if exists prescriptions_role_read on prescriptions;
create policy prescriptions_role_read on prescriptions
  for select using (
    patient_id in (
      select p.id from patients p
      join app_users u on u.id = p.user_id
      where u.external_id = auth.uid()
    )
    or doctor_id in (select id from app_users where external_id = auth.uid())
    or pharmacy_id in (
      select ph.id from pharmacies ph
      join app_users u on u.id = ph.user_id and u.external_id = auth.uid()
    )
    or exists(
      select 1 from app_users u
      join roles r on r.id = u.role_id
      where u.external_id = auth.uid() and r.name = 'admin'
    )
  );

-- pharmacies can manage medicines they own
drop policy if exists medicines_pharmacy_rw on medicines;
create policy medicines_pharmacy_rw on medicines
  for all using (
    pharmacy_id in (
      select ph.id from pharmacies ph
      join app_users u on u.id = ph.user_id
      where u.external_id = auth.uid()
    )
  );

-- blood banks can manage their inventory
drop policy if exists blood_inventory_bank_rw on blood_inventory;
create policy blood_inventory_bank_rw on blood_inventory
  for all using (
    blood_bank_id in (
      select bb.id from blood_banks bb
      join app_users u on u.id = bb.user_id
      where u.external_id = auth.uid()
    )
  );

-- notifications: user can read their own
drop policy if exists notifications_recipient on notifications;
create policy notifications_recipient on notifications
  for select using (
    recipient_user_id in (select id from app_users where external_id = auth.uid())
  );

-- Note: For insert/update policies, add similarly restricted policies as needed.
