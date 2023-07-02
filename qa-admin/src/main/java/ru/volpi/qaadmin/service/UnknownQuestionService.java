package ru.volpi.qaadmin.service;

import ru.volpi.qaadmin.dto.question.AnsweredQuestion;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.UnknownQuestionResponse;

import java.util.List;

public interface UnknownQuestionService {
    QuestionResponse addAnswer(AnsweredQuestion answered);

    List<UnknownQuestionResponse> findAll();

    void deleteById(Long id);
}
