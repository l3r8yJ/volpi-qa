package ru.volpi.qaadmin.service.impl;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.volpi.qaadmin.TestcontainersTest;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;
import ru.volpi.qaadmin.dto.question.QuestionsCategory;
import ru.volpi.qaadmin.exception.question.QuestionNotFoundException;
import ru.volpi.qaadmin.service.CategoryService;
import ru.volpi.qaadmin.service.QuestionService;

import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class QuestionServiceImplTest extends TestcontainersTest {

    private static final long QUESTION_ID = 324L;

    private static final long DELETION_QUESTION_ID = 431L;

    private static final long CATEGORY_ID = 1230L;

    private static final int NUMBER_OF_QUESTIONS = 2;

    private static final int NUMBER_OF_QUESTIONS_WITH_FIRST_CATEGORY = 1;

    private static final String FIRST_CATEGORY_NAME = "Первая категория";

    @Autowired
    private QuestionService questionService;

    @Autowired
    private CategoryService categoryService;

    @Test
    @DisplayName("Finds all questions")
    void findsAllQuestions() {
        assertThat(this.questionService.findAll()).hasSize(NUMBER_OF_QUESTIONS);
    }

    @Test
    @DisplayName("Finds questions by category")
    void findsQuestionsByCategoryName() {
        assertThat(this.questionService.findQuestionsByCategoryName(FIRST_CATEGORY_NAME))
            .hasSize(NUMBER_OF_QUESTIONS_WITH_FIRST_CATEGORY);
    }

    @Test
    @DisplayName("Finds question by id")
    void findsByIdCorrectly() {
        assertThat(this.questionService.findById(QUESTION_ID))
            .isEqualTo(
                new QuestionResponse(
                    QUESTION_ID,
                    "Вопрос уровня а",
                    "Ответ уровня а",
                    FIRST_CATEGORY_NAME
                )
            );
    }

    @Test
    @DisplayName("Updates correctly")
    void updatesCorrectly() {
        final QuestionResponse updated = this.questionService.update(
            QUESTION_ID,
            new QuestionUpdate(
                "Обновленный вопрос уровня а",
                "Обновленный ответ уровня а",
                new QuestionsCategory(CATEGORY_ID, FIRST_CATEGORY_NAME)
            )
        );
        assertThat(updated).isNotNull();
        assertThat(updated.answer()).isEqualTo("Обновленный ответ уровня а");
    }

    @Test
    @DisplayName("Saves correctly")
    void savesQuestionCorrectly() {
        final QuestionResponse saved = this.questionService.save(
            new QuestionRegistration(
                "Новый вопрос",
                "Новый ответ",
                new QuestionsCategory(CATEGORY_ID, FIRST_CATEGORY_NAME)
            )
        );
        assertThat(saved).isNotNull();
        assertThat(saved.categoryName()).isEqualTo(FIRST_CATEGORY_NAME);
        final Set<String> questionNames =
            this.categoryService.findCategoryByName(FIRST_CATEGORY_NAME)
                .questions()
                .stream()
                .map(QuestionResponse::text)
                .collect(Collectors.toSet());
        assertThat(questionNames).contains("Новый вопрос");
    }

    @Test
    @DisplayName("Deletes by id correctly")
    void deletesCorrectly() {
        assertThat(this.questionService.findById(DELETION_QUESTION_ID)).isNotNull();
        assertThat(this.questionService.deleteById(DELETION_QUESTION_ID)).isEqualTo(DELETION_QUESTION_ID);
        assertThrows(
            QuestionNotFoundException.class,
            () -> this.questionService.findById(DELETION_QUESTION_ID),
            "Вопрос с id '%d' не найден!".formatted(DELETION_QUESTION_ID)
        );
    }
}