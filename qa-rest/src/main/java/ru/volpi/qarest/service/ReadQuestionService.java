package ru.volpi.qarest.service;

import ru.volpi.qarest.dto.question.QuestionResponse;

import java.util.List;

public interface ReadQuestionService {

    QuestionResponse findQuestionById(Long id);

    QuestionResponse findQuestionByText(String text);

    List<QuestionResponse> findAllQuestions();

    List<QuestionResponse> findQuestionsByCategoryName(String name);
}
