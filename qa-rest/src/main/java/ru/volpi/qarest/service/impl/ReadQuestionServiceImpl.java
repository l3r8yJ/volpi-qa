package ru.volpi.qarest.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qarest.dto.question.QuestionResponse;
import ru.volpi.qarest.exception.question.QuestionNotFoundException;
import ru.volpi.qarest.repository.question.QuestionRepository;
import ru.volpi.qarest.service.ReadQuestionService;
import ru.volpi.qarest.service.annotation.TransactionalService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@TransactionalService
public class ReadQuestionServiceImpl implements ReadQuestionService {

    private final QuestionRepository questionRepository;

    @Transactional
    @Override
    public QuestionResponse findQuestionById(final Long id) {
        return this.questionRepository.findById(id)
            .map(QuestionResponse::from).orElseThrow(() -> new QuestionNotFoundException(id));
    }

    @Transactional
    @Override
    public QuestionResponse findQuestionByName(final String name) {
        return this.questionRepository.findQuestionByName(name)
            .map(QuestionResponse::from).orElseThrow(() -> new QuestionNotFoundException(name));
    }

    @Transactional
    @Override
    public List<QuestionResponse> findAllQuestions() {
        return this.questionRepository.findAll().stream()
            .map(QuestionResponse::from).toList();
    }

    @Transactional
    @Override
    public List<QuestionResponse> findAllQuestionsByCategoryName(final String name) {
        return this.questionRepository.findQuestionsByCategoryNameIgnoreCase(name)
            .stream().map(QuestionResponse::from).toList();
    }
}
