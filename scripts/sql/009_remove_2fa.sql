-- Remove 2FA tables and columns
drop table if exists sms_2fa_codes;
alter table app_users drop column if exists twofa_enabled;
alter table app_users drop column if exists twofa_secret;
