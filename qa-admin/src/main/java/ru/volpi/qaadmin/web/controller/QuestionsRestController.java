package ru.volpi.qaadmin.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.question.AnsweredQuestion;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;
import ru.volpi.qaadmin.dto.question.UnknownQuestionResponse;
import ru.volpi.qaadmin.service.CategoryService;
import ru.volpi.qaadmin.service.QuestionService;
import ru.volpi.qaadmin.service.UnknownQuestionService;

import java.util.List;

@Tag(name = "Questions API")
@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/questions")
@RestController
public class QuestionsRestController {

    private final QuestionService questionService;

    private final CategoryService categoryService;

    private final UnknownQuestionService unknownQuestionService;

    @Operation(summary = "Достает все вопросы")
    @GetMapping
    public ResponseEntity<List<QuestionResponse>> allQuestions() {
        return ResponseEntity.ok(this.questionService.findAll());
    }

    @Operation(summary = "Достает вопросы по названию категории")
    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<QuestionResponse>> questionsByCategoryName(
        @Parameter(name = "category", description = "Название категории", example = "Моя категория")
        @PathVariable final String category
    ) {
        return ResponseEntity.ok(this.questionService.findQuestionsByCategoryName(category));
    }

    @Operation(summary = "Достает вопрос по id")
    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> questionById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.questionService.findById(id));
    }

    @Operation(summary = "Создает новый вопрос")
    @PutMapping
    public ResponseEntity<QuestionResponse> createQuestion(@RequestBody final QuestionRegistration registration) {
        final CategoryResponse category = this.categoryService.findCategoryByName(registration.category().name());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(this.questionService.save(QuestionRegistration.from(registration, category.id())));
    }

    @Operation(summary = "Обновляет существующий вопрос по id вопроса")
    @PatchMapping("/{id}")
    public ResponseEntity<QuestionResponse> updateQuestionById(
        @PathVariable final Long id,
        @RequestBody final QuestionUpdate update
    ) {
        final Long categoryId = this.categoryService.categoryIdByName(update.category().name());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(this.questionService.update(id, QuestionUpdate.from(update, categoryId)));
    }

    @Operation(summary = "Удаляет существующий вопрос по id вопроса")
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteQuestionById(@PathVariable final Long id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.questionService.deleteById(id));
    }

    @Operation(summary = "Достает все вопросы от пользователей")
    @GetMapping("/unknown")
    public ResponseEntity<List<UnknownQuestionResponse>> unknownQuestions() {
        return ResponseEntity.ok(this.unknownQuestionService.findAll());
    }

    @Operation(summary = "Удалить вопрос от пользователя по id")
    @DeleteMapping("/unknown/{id}")
    public ResponseEntity<Void> deleteUnknownQuestionById(@PathVariable final Long id) {
        this.unknownQuestionService.deleteById(id);
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Добавляет ответ к вопросу от пользователя и удаляет его из списка вопросов от пользователей")
    @PatchMapping("/answer")
    public ResponseEntity<QuestionResponse> addAnswerToUnknownQuestion(
        @Parameter(name = "Ответ на вопрос")
        @RequestBody final AnsweredQuestion answeredQuestion
    ) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.unknownQuestionService.addAnswer(answeredQuestion));
    }
}
