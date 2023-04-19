package ru.volpi.qarest.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.volpi.qarest.service.ReadQuestionService;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/questions")
@RestController
public class QuestionsController {

    private final ReadQuestionService questionService;

    @GetMapping
    public final ResponseEntity<?> allQuestions() {
        return ResponseEntity.ok(this.questionService.findAllQuestions());
    }

    @GetMapping("{id}")
    public final ResponseEntity<?> questionById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.questionService.findQuestionById(id));
    }

    @GetMapping("/by-text/{name}")
    public final ResponseEntity<?> questionByText(@PathVariable final String name) {
        return ResponseEntity.ok(this.questionService.findQuestionByText(name));
    }

    @GetMapping("/by-category/{category}")
    public final ResponseEntity<?> questionsByCategoryName(@PathVariable final String category) {
        return ResponseEntity.ok(this.questionService.findAllQuestionsByCategoryName(category));
    }
}
