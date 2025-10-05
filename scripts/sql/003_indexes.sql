create index if not exists idx_blood_inventory_group on blood_inventory(blood_group);
create index if not exists idx_medicine_requests_patient on medicine_requests(patient_id);
create index if not exists idx_blood_requests_priority on blood_requests(priority);
create index if not exists idx_prescriptions_status on prescriptions(status);
