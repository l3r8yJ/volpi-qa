package ru.volpi.qaadmin.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.dto.question.Answer;
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
    public QuestionResponse addAnswer(final Answer answer) {
        log.info("Answer came {}", answer);
        return QuestionResponse.from(
            this.unknownQuestionRepository.findById(answer.getUnknownQuestionId())
                .map(
                    question -> {
                        final Question answered = this.questionRepository.save(
                            Question.builder()
                                .text(question.getText())
                                .answer(answer.getText())
                                .category(
                                    this.categoryRepository.findByNameIgnoreCase(answer.getCategory())
                                        .orElseThrow(() -> new CategoryNotFoundException(answer.getCategory()))
                                )
                                .build()
                        );
                        this.unknownQuestionRepository.deleteById(answer.getUnknownQuestionId());
                        this.emailService.sendNotification(
                            question.getEmail(),
                            "Ответ на Ваш вопрос добавлен",
                            question.getText()
                        );
                        log.info("Answer {} added", answer);
                        return answered;
                    }
                ).orElseThrow(() -> new QuestionNotFoundException(answer.getUnknownQuestionId()))
        );
    }

    @Transactional(readOnly = true)
    @Override
    public List<UnknownQuestionResponse> findAll() {
        return this.unknownQuestionRepository.findAll()
            .stream()
            .map(question -> new UnknownQuestionResponse(question.getId(), question.getText()))
            .toList();
    }
}
