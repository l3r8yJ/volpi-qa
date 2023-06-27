package ru.volpi.qarest.service.impl;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.shaded.org.hamcrest.MatcherAssert;
import org.testcontainers.shaded.org.hamcrest.Matchers;
import ru.volpi.qarest.TestcontainersTest;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;
import ru.volpi.qarest.exception.question.QuestionAlreadyExistsException;
import ru.volpi.qarest.exception.question.QuestionValidationException;
import ru.volpi.qarest.service.UnknownQuestionService;

import static org.junit.jupiter.api.Assertions.assertThrows;

@Transactional
class UnknownQuestionServiceImplTest extends TestcontainersTest {

    @Autowired
    private UnknownQuestionService unknownQuestionService;

    @Test
    @DisplayName("Just saves unknown question")
    void savesUnknownQuestion() {
        MatcherAssert.assertThat(
            this.unknownQuestionService.save(
                new RegisterUnknownQuestion("q text", "q@gmail.com")
            ).getText(),
            Matchers.startsWith("Ваш вопрос")
        );
    }

    @Test
    @DisplayName("Throws exception when trying to save existing question")
    void throwsExistingUnknownQuestion() {
        assertThrows(
            QuestionAlreadyExistsException.class,
            () ->
                this.unknownQuestionService.save(
                    new RegisterUnknownQuestion("Вопрос уровня а", "q@gmail.com")
                )
        );
    }

    @Test
    @DisplayName("Throws an exception when question is empty")
    void throwsWhenEmptyQuestion() {
        assertThrows(
            QuestionValidationException.class,
            () ->
                this.unknownQuestionService.save(
                    new RegisterUnknownQuestion("", "q@gmail.com")
                ),
            "Текст вопроса не может быть пустым"
        );
    }

    @Test
    @DisplayName("Throws an exception when email not valid")
    void throwsWhenNotValidEmail() {
        assertThrows(
            QuestionValidationException.class,
            () ->
                this.unknownQuestionService.save(
                    new RegisterUnknownQuestion("blah blah blah", "qgmail.com")
                ),
            "Почта должна иметь правильный формат"
        );
    }
}