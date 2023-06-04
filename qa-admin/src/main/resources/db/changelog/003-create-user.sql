-- liquibase formatted sql

-- changeset iivanchuk:1
CREATE SCHEMA IF NOT EXISTS users_storage;

-- changeset iivanchuk:2
CREATE TABLE IF NOT EXISTS users_storage.users
(
    id       BIGSERIAL           NOT NULL,
    username VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128)        NOT NULL
);
