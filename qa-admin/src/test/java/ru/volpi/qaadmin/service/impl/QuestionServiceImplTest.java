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

    @Autowired
    private QuestionService questionService;

    @Autowired
    private CategoryService categoryService;

    @Test
    @DisplayName("Finds all questions")
    void findsAllQuestions() {
        assertThat(this.questionService.findAll())
            .hasSize(2);
    }

    @Test
    @DisplayName("Finds question by id")
    void findsByIdCorrectly() {
        assertThat(this.questionService.findById(324L))
            .isEqualTo(
                new QuestionResponse(
                    "Вопрос уровня а",
                    "Ответ уровня а",
                    "Первая категория"
                )
            );
    }

    @Test
    @DisplayName("Updates correctly")
    void updatesCorrectly() {
        final QuestionResponse updated = this.questionService.update(
            324L,
            new QuestionUpdate(
                "Обновленный вопрос уровня а",
                "Обновленный ответ уровня а",
                new QuestionsCategory(1230L, "Первая категория")
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
                new QuestionsCategory(1230L, "Первая категория")
            )
        );
        assertThat(saved).isNotNull();
        assertThat(saved.categoryName()).isEqualTo("Первая категория");
        final Set<String> category =
            this.categoryService.findCategoryByName("Первая категория")
                .questions()
                .stream()
                .map(QuestionResponse::text)
                .collect(Collectors.toSet());
        assertThat(category)
            .contains("Новый вопрос");
    }

    @Test
    @DisplayName("Deletes by id correctly")
    void deletesCorrectly() {
        assertThat(this.questionService.findById(431L)).isNotNull();
        assertThat(this.questionService.deleteById(431L)).isEqualTo(431L);
        assertThrows(
            QuestionNotFoundException.class,
            () -> this.questionService.findById(431L),
            "Вопрос с id '431' не найден!"
        );
    }
}