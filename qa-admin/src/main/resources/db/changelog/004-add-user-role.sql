ALTER TABLE IF EXISTS users_storage.users
    ADD COLUMN role VARCHAR(48) NOT NULL default 'USER';