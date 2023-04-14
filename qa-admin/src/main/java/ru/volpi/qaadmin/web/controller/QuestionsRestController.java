package ru.volpi.qaadmin.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;
import ru.volpi.qaadmin.service.QuestionService;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/questions")
@RestController
public class QuestionsRestController {

    private final QuestionService questionService;

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
        return ResponseEntity.status(HttpStatus.CREATED).body(this.questionService.save(registration));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateQuestionById(@PathVariable final Long id, final QuestionUpdate update) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.questionService.update(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestionById(@PathVariable final Long id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.questionService.deleteById(id));
    }
}
