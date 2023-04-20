package ru.volpi.qarest.service.impl;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.volpi.qarest.TestcontainersTest;
import ru.volpi.qarest.dto.question.QuestionResponse;
import ru.volpi.qarest.exception.question.QuestionNotFoundException;
import ru.volpi.qarest.service.ReadQuestionService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ReadQuestionServiceImplTest extends TestcontainersTest {

    private static final long EXISTING_QUESTION_ID = 324L;

    private static final long NOT_EXISTING_QUESTION_ID = 123L;

    private static final int NUMBER_OF_QUESTIONS = 2;

    private static final int NUMBER_OF_QUESTIONS_IN_CATEGORY = 1;

    private static final String EXISTING_QUESTION_TEXT = "Вопрос уровня а";

    private static final String NOT_EXISTING_QUESTION_TEXT = "abcd";

    private static final String CATEGORY_NAME = "Первая категория";

    @Autowired
    private ReadQuestionService questionService;

    @Test
    @DisplayName("Finds question by id")
    void findsQuestionById() {
        final QuestionResponse actual =
            this.questionService.findQuestionById(EXISTING_QUESTION_ID);
        assertThat(actual).isNotNull();
        assertThat(actual.id()).isEqualTo(EXISTING_QUESTION_ID);
        assertThat(actual.text()).isEqualTo(EXISTING_QUESTION_TEXT);
    }

    @Test
    @DisplayName("Doesn't find a question that doesn't exist by id, throws an exception")
    void doesntFindNotExistingQuestionByIdAndThrowsException() {
        assertThrows(
            QuestionNotFoundException.class,
            () -> this.questionService.findQuestionById(NOT_EXISTING_QUESTION_ID),
            "Вопрос с id '%d' не найден!".formatted(NOT_EXISTING_QUESTION_ID)
        );
    }

    @Test
    @DisplayName("Finds question by text")
    void findsQuestionByText() {
        final QuestionResponse actual =
            this.questionService.findQuestionByText(EXISTING_QUESTION_TEXT);
        assertThat(actual).isNotNull();
        assertThat(actual.text()).isEqualTo(EXISTING_QUESTION_TEXT);
    }

    @Test
    @DisplayName("Doesn't find a question that doesn't exist by text, throws an exception")
    void doesntFindNotExistingQuestionByTextAndThrowsException() {
        assertThrows(
            QuestionNotFoundException.class,
            () -> this.questionService.findQuestionByText(NOT_EXISTING_QUESTION_TEXT),
            "Вопрос '%s' не найден".formatted(NOT_EXISTING_QUESTION_TEXT)
        );
    }

    @Test
    @DisplayName("Finds all questions")
    void findsAllQuestions() {
        assertThat(this.questionService.findAllQuestions()).hasSize(NUMBER_OF_QUESTIONS);
    }

    @Test
    @DisplayName("Finds questions by category name")
    void findsQuestionsByCategoryName() {
        assertThat(this.questionService.findQuestionsByCategoryName(CATEGORY_NAME))
            .hasSize(NUMBER_OF_QUESTIONS_IN_CATEGORY);
    }
}
