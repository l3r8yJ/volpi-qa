-- liquibase formatted sql

-- changeset iivanchuk:1
CREATE TABLE IF NOT EXISTS categories_storage.categories
(
    id              BIGSERIAL               NOT NULL,
    category_name   VARCHAR(128) UNIQUE     NOT NULL,
    CONSTRAINT pk_categories PRIMARY KEY (id)
);

-- changeset iivanchuk:2
CREATE TABLE IF NOT EXISTS questions_storage.questions
(
    id              BIGSERIAL               NOT NULL,
    category_id     BIGSERIAL   REFERENCES categories_storage.categories (id),
    question_text   VARCHAR(255)            NOT NULL,
    question_answer TEXT                    NOT NULL
)
