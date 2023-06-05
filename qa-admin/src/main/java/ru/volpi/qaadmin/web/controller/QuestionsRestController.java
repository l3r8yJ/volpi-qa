package ru.volpi.qaadmin.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;
import ru.volpi.qaadmin.service.CategoryService;
import ru.volpi.qaadmin.service.QuestionService;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/questions")
@RestController
public class QuestionsRestController {

    private final QuestionService questionService;

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> allQuestions() {
        return ResponseEntity.ok(this.questionService.findAll());
    }

    @GetMapping("/by-category/{category}")
    public ResponseEntity<?> questionsByCategoryName(@PathVariable final String category) {
        return ResponseEntity.ok(this.questionService.findQuestionsByCategoryName(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> questionById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.questionService.findById(id));
    }

    @PutMapping
    public ResponseEntity<?> createQuestion(@RequestBody final QuestionRegistration registration) {
        final CategoryResponse category = this.categoryService.findCategoryByName(registration.category().name());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(this.questionService.save(QuestionRegistration.from(registration, category.id())));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateQuestionById(
        @PathVariable final Long id,
        @RequestBody final QuestionUpdate update
    ) {
        final Long categoryId = this.categoryService.categoryIdByName(update.category().name());
        return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(this.questionService.update(id, QuestionUpdate.from(update, categoryId)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestionById(@PathVariable final Long id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.questionService.deleteById(id));
    }
}
