-- Add registration/license number to blood_banks
alter table if exists blood_banks
  add column if not exists registration_id text;

create index if not exists idx_blood_banks_registration on blood_banks(registration_id);

