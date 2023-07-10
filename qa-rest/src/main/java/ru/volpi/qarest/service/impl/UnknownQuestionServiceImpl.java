package ru.volpi.qarest.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qarest.common.Messages;
import ru.volpi.qarest.domain.question.UnknownQuestion;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;
import ru.volpi.qarest.dto.question.ResponseDto;
import ru.volpi.qarest.exception.question.EmailAlreadyExistsException;
import ru.volpi.qarest.exception.question.QuestionAlreadyExistsException;
import ru.volpi.qarest.exception.question.QuestionValidationException;
import ru.volpi.qarest.mapper.UnknownQuestionMapper;
import ru.volpi.qarest.repository.question.QuestionRepository;
import ru.volpi.qarest.repository.question.UnknownQuestionRepository;
import ru.volpi.qarest.service.UnknownQuestionService;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class UnknownQuestionServiceImpl implements UnknownQuestionService {

    private final UnknownQuestionRepository unknownQuestionRepository;

    private final QuestionRepository questionRepository;

    private final UnknownQuestionMapper questionMapper;

    private final Validator validator;

    @Transactional
    @Override
    public ResponseDto save(final RegisterUnknownQuestion register) {
        if (this.unknownQuestionRepository.existsByEmail(register.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        this.validate(register);
        final UnknownQuestion question = this.questionMapper.toUnknownQuestion(register);
        question.setCreatedAt(
            ZonedDateTime.now().withZoneSameLocal(
                ZoneId.of("Europe/Moscow")
            )
        );
        this.unknownQuestionRepository.save(question);
        return ResponseDto.builder()
            .text(Messages.NEW_QUESTION_ADDED.formatted(register.getText()))
            .build();
    }

    private void validate(final RegisterUnknownQuestion register) {
        if (this.questionRepository.existsByText(register.getText())) {
            throw new QuestionAlreadyExistsException(register.getText());
        }
        final Set<ConstraintViolation<RegisterUnknownQuestion>> violations = this.validator.validate(register);
        if (!violations.isEmpty()) {
            throw new QuestionValidationException(violations);
        }
    }
}
