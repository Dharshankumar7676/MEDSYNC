-- Add a demo hospital user and org
with r_hospital as (
  insert into app_users (email, full_name, is_verified, role_id)
    select 'demo-hospital@example.com', 'Demo Hospital Admin', true, id from roles where name='doctor'
  on conflict (email) do update set full_name = excluded.full_name
  returning id
)
insert into hospitals (user_id, name, registration_id, address, location, bed_capacity, beds_available)
select (select id from r_hospital), 'CityCare Hospital', 'HOSP-123', '123 Main St', ST_SetSRID(ST_MakePoint(77.5946,12.9716),4326)::geography, 100, 75
on conflict (user_id) do nothing;

-- Add a demo pharmacy user and org
with r_pharmacy as (
  insert into app_users (email, full_name, is_verified, role_id)
    select 'demo-pharmacy@example.com', 'Demo Pharmacy Manager', true, id from roles where name='pharmacy'
  on conflict (email) do update set full_name = excluded.full_name
  returning id
)
insert into pharmacies (user_id, name, license_id, address, location)
select (select id from r_pharmacy), 'GoodHealth Pharmacy', 'PHARM-456', '456 Market Rd', ST_SetSRID(ST_MakePoint(77.6,12.97),4326)::geography
on conflict (user_id) do nothing;

-- Add a demo blood bank user and org
with r_bbank as (
  insert into app_users (email, full_name, is_verified, role_id)
    select 'demo-bbank@example.com', 'Demo Blood Bank Manager', true, id from roles where name='blood_bank'
  on conflict (email) do update set full_name = excluded.full_name
  returning id
)
insert into blood_banks (user_id, name, address, location)
select (select id from r_bbank), 'LifeFlow Blood Bank', '789 Health Ave', ST_SetSRID(ST_MakePoint(77.59,12.975),4326)::geography
on conflict (user_id) do nothing;

-- Seed inventory for the demo blood bank
insert into blood_inventory (blood_bank_id, blood_group, units_available)
select bb.id, t.bg, 10
from blood_banks bb
join app_users u on u.id = bb.user_id and u.email = 'demo-bbank@example.com'
join (values ('A+'),('A-'),('B+'),('B-'),('AB+'),('AB-'),('O+'),('O-')) as t(bg) on true
on conflict (blood_bank_id, blood_group) do nothing;
