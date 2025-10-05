-- Add helpful indexes/uniques for organization identifiers

-- Hospitals: registration_id lookup/uniqueness
create unique index if not exists idx_hospitals_registration_unique on hospitals(registration_id);

-- Pharmacies: license_id lookup/uniqueness
create unique index if not exists idx_pharmacies_license_unique on pharmacies(license_id);

-- Blood Banks: registration_id lookup/uniqueness
create unique index if not exists idx_blood_banks_registration_unique on blood_banks(registration_id);

-- Doctors: medical_id lookup/uniqueness
create unique index if not exists idx_doctors_medical_id_unique on doctors(medical_id);

