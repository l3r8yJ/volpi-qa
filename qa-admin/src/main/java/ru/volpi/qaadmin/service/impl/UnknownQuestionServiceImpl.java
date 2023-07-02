package ru.volpi.qaadmin.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.dto.question.AnsweredQuestion;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.UnknownQuestionResponse;
import ru.volpi.qaadmin.exception.category.CategoryNotFoundException;
import ru.volpi.qaadmin.exception.question.QuestionNotFoundException;
import ru.volpi.qaadmin.repository.CategoryRepository;
import ru.volpi.qaadmin.repository.QuestionRepository;
import ru.volpi.qaadmin.repository.UnknownQuestionRepository;
import ru.volpi.qaadmin.service.EmailService;
import ru.volpi.qaadmin.service.UnknownQuestionService;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UnknownQuestionServiceImpl implements UnknownQuestionService {

    private final UnknownQuestionRepository unknownQuestionRepository;

    private final QuestionRepository questionRepository;

    private final CategoryRepository categoryRepository;

    private final EmailService emailService;

    @Transactional
    @Override
    public QuestionResponse addAnswer(final AnsweredQuestion answered) {
        log.info("Answer came {}", answered);
        final Long id = answered.getUnknownQuestionId();
        return QuestionResponse.from(
            this.unknownQuestionRepository.findById(id)
                .map(
                    question -> {
                        final Question saved = this.questionAfterSave(answered);
                        this.unknownQuestionRepository.deleteById(id);
                        this.emailService.sendAnsweredNotification(
                            question.getEmail(),
                            saved.getText()
                        );
                        log.info("Answer {} added", saved);
                        return saved;
                    }
                ).orElseThrow(() -> new QuestionNotFoundException(id))
        );
    }

    private Question questionAfterSave(final AnsweredQuestion answeredQuestion) {
        return this.questionRepository.save(
            Question.builder()
                .text(answeredQuestion.getText())
                .answer(answeredQuestion.getAnswer())
                .category(
                    this.categoryRepository.findByNameIgnoreCase(answeredQuestion.getCategory())
                        .orElseThrow(() -> new CategoryNotFoundException(answeredQuestion.getCategory()))
                )
                .build()
        );
    }

    @Transactional(readOnly = true)
    @Override
    public List<UnknownQuestionResponse> findAll() {
        return this.unknownQuestionRepository.findAll()
            .stream()
            .map(
                question -> new UnknownQuestionResponse(
                    question.getId(),
                    question.getText(),
                    question.getCreatedAt()
                )
            ).toList();
    }

    @Transactional
    @Override
    public void deleteById(final Long id) {
        this.emailService.sendRemovedNotification(
            this.unknownQuestionRepository.findById(id)
                .orElseThrow()
                .getEmail()
        );
        this.unknownQuestionRepository.deleteById(id);
    }
}
