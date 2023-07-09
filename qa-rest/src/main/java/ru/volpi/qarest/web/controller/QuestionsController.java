package ru.volpi.qarest.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;
import ru.volpi.qarest.service.ReadQuestionService;
import ru.volpi.qarest.service.UnknownQuestionService;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/questions")
@RestController
public class QuestionsController {

    private final ReadQuestionService questionService;

    private final UnknownQuestionService unknownQuestionService;

    @GetMapping
    public final ResponseEntity<?> allQuestions() {
        return ResponseEntity.ok(this.questionService.findAllQuestions());
    }

    @GetMapping("{id}")
    public final ResponseEntity<?> questionById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.questionService.findQuestionById(id));
    }

    @GetMapping("/by-text/{text}")
    public final ResponseEntity<?> questionByText(@PathVariable final String text) {
        return ResponseEntity.ok(this.questionService.findQuestionByText(text));
    }

    @GetMapping("/by-category/{category}")
    public final ResponseEntity<?> questionsByCategoryName(@PathVariable final String category) {
        return ResponseEntity.ok(this.questionService.findQuestionsByCategoryName(category));
    }

    @PostMapping
    public final ResponseEntity<?> registerUnknownQuestion(@RequestBody final RegisterUnknownQuestion register) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.unknownQuestionService.save(register));
    }
}
