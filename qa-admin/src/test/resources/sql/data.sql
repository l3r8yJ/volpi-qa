INSERT INTO categories_storage.categories(id, category_name)
VALUES (1230, 'Первая категория');
INSERT INTO categories_storage.categories(id, category_name)
VALUES (3421, 'Вторая категория');

INSERT INTO questions_storage.questions(id, category_id, question_text, question_answer)
VALUES (324, 1230, 'Вопрос уровня а', 'Ответ уровня а');

INSERT INTO questions_storage.questions(id, category_id, question_text, question_answer)
VALUES (431, 3421, 'Вопрос уровня б', 'Ответ уровня б');

INSERT INTO users_storage.users(id, username, password, role)
VALUES (101, 'admin', '$2a$10$ecu/WLJDj7mQhXpa9lfJ0O/.NK38FeVtErsUPE8smP8bDHAXcs5vi', 'admin');

INSERT INTO unknown_questions_storage.unknown_questions(id, text, email)
VALUES (111, 'Мой новый вопрос', 'blah@gmail.com');