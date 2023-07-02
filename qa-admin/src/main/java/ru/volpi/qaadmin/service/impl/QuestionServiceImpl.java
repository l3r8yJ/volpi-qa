package ru.volpi.qaadmin.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.domain.question.Questions;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;
import ru.volpi.qaadmin.exception.question.QuestionNotFoundException;
import ru.volpi.qaadmin.exception.question.QuestionValidationException;
import ru.volpi.qaadmin.repository.QuestionRepository;
import ru.volpi.qaadmin.service.QuestionService;
import ru.volpi.qaadmin.service.annotation.TransactionalService;

import java.util.Collection;
import java.util.List;

@Slf4j
@TransactionalService
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    private final Validator validator;

    private static void checkViolations(final Collection<ConstraintViolation<Object>> violations) {
        if (!violations.isEmpty()) {
            throw new QuestionValidationException(violations);
        }
    }

    @Transactional
    @Override
    public List<QuestionResponse> findAll() {
        return this.questionRepository.findAll()
            .stream().map(QuestionResponse::from).toList();
    }

    @Transactional
    @Override
    public List<QuestionResponse> findQuestionsByCategoryName(final String category) {
        return this.questionRepository.findQuestionsByCategoryName(category)
            .stream().map(QuestionResponse::from).toList();
    }

    @Transactional
    @Override
    public QuestionResponse findById(final Long id) {
        if (!this.questionRepository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }
        return this.questionRepository.findById(id)
            .map(QuestionResponse::from)
            .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    @Transactional
    @Override
    public QuestionResponse update(final Long id, final QuestionUpdate update) {
        checkViolations(this.validator.validate(update));
        return this.questionRepository.findById(id)
            .map(question -> Questions.of(id, update))
            .map(this.questionRepository::saveAndFlush)
            .map(QuestionResponse::from)
            .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    @Transactional
    @Override
    public QuestionResponse save(final QuestionRegistration registration) {
        checkViolations(this.validator.validate(registration));
        final Question saved = this.questionRepository.save(Questions.from(registration));
        return QuestionResponse.from(saved);
    }

    @Transactional
    @Override
    public Long deleteById(final Long id) {
        if (!this.questionRepository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }
        this.questionRepository.deleteById(id);
        return id;
    }
}
