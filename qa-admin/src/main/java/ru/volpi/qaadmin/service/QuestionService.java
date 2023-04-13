package ru.volpi.qaadmin.service;

import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;

import java.util.List;

public interface QuestionService {

    List<QuestionResponse> findAll();

    QuestionResponse findById(Long id);

    QuestionResponse update(Long id, QuestionUpdate update);

    QuestionResponse save(QuestionRegistration registration);

    Long deleteById(Long id);
}
