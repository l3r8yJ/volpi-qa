package ru.volpi.qaadmin.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.domain.question.Questions;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;
import ru.volpi.qaadmin.exception.question.QuestionNotFoundException;
import ru.volpi.qaadmin.repository.QuestionRepository;
import ru.volpi.qaadmin.service.QuestionService;
import ru.volpi.qaadmin.service.annotation.TransactionalService;

import java.util.List;

@Slf4j
@TransactionalService
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Transactional
    @Override
    public List<QuestionResponse> findAll() {
        return this.questionRepository.findAll()
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
        return this.questionRepository.findById(id)
            .map(question -> Questions.of(id, update))
            .map(this.questionRepository::saveAndFlush)
            .map(QuestionResponse::from)
            .orElseThrow(() -> new QuestionNotFoundException(id));
    }

    @Transactional
    @Override
    public QuestionResponse save(final QuestionRegistration registration) {
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
