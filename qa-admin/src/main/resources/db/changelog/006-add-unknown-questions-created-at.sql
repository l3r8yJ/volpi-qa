ALTER TABLE IF EXISTS unknown_questions_storage.unknown_questions
    ADD COLUMN created_at timestamp NOT NULL default clock_timestamp();