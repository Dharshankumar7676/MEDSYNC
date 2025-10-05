from passlib.hash import bcrypt
print(bcrypt.hash("admin123"))

#update auth_passwords set password_hash = '<your bcrypt hash>' where user_id = '<user_id>';


#to insert if not present
#insert into auth_passwords(user_id, password_hash) values('<user_id>', '<your bcrypt hash>')
#on conflict (user_id) do update set password_hash=excluded.password_hash;