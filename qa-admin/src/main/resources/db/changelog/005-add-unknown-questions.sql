-- liquibase formatted sql

-- changeset iivanchuk:1
CREATE SCHEMA IF NOT EXISTS unknown_questions_storage;

-- changeset iivanchuk:2
CREATE TABLE IF NOT EXISTS unknown_questions_storage.unknown_questions
(
    id    BIGSERIAL UNIQUE NOT NULL,
    text  VARCHAR(255)     NOT NULL,
    email varchar(255)     NOT NULL UNIQUE
)