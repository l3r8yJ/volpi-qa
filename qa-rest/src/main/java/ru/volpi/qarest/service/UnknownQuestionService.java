package ru.volpi.qarest.service;

import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;
import ru.volpi.qarest.dto.question.ResponseDto;

public interface UnknownQuestionService {
    ResponseDto save(RegisterUnknownQuestion register);
}
