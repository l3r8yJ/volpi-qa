package ru.volpi.qaadmin.service;

import ru.volpi.qaadmin.dto.question.Answer;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.UnknownQuestionResponse;

import java.util.List;

public interface UnknownQuestionService {
    QuestionResponse addAnswer(Answer answer);

    List<UnknownQuestionResponse> findAll();
}
