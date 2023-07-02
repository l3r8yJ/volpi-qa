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
    public QuestionResponse addAnswer(final AnsweredQuestion answeredQuestion) {
        log.info("Answer came {}", answeredQuestion);
        return QuestionResponse.from(
            this.unknownQuestionRepository.findById(answeredQuestion.getUnknownQuestionId())
                .map(
                    question -> {
                        final Question answered = this.questionRepository.save(
                            Question.builder()
                                .text(answeredQuestion.getText())
                                .answer(answeredQuestion.getAnswer())
                                .category(
                                    this.categoryRepository.findByNameIgnoreCase(answeredQuestion.getCategory())
                                        .orElseThrow(() -> new CategoryNotFoundException(answeredQuestion.getCategory()))
                                )
                                .build()
                        );
                        this.unknownQuestionRepository.deleteById(answeredQuestion.getUnknownQuestionId());
                        this.emailService.sendNotification(
                            question.getEmail(),
                            "Ответ на Ваш вопрос добавлен",
                            answeredQuestion.getText()
                        );
                        log.info("Answer {} added", answeredQuestion);
                        return answered;
                    }
                ).orElseThrow(() -> new QuestionNotFoundException(answeredQuestion.getUnknownQuestionId()))
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

    @Override
    public void deleteById(final Long id) {
        this.unknownQuestionRepository.deleteById(id);
    }
}
