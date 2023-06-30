package ru.volpi.qaadmin.service;

import ru.volpi.qaadmin.dto.question.Answer;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;

import java.util.List;

public interface QuestionService {

    List<QuestionResponse> findAll();

    List<QuestionResponse> findQuestionsByCategoryName(String category);

    QuestionResponse findById(Long id);

    QuestionResponse update(Long id, QuestionUpdate update);

    QuestionResponse save(QuestionRegistration registration);

    Long deleteById(Long id);

    QuestionResponse addAnswer(Answer answer);
}
