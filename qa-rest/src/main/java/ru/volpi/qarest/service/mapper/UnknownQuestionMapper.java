package ru.volpi.qarest.service.mapper;

import org.mapstruct.Mapper;
import ru.volpi.qarest.domain.question.UnknownQuestion;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;

@Mapper(componentModel = "spring")
public interface UnknownQuestionMapper {
    UnknownQuestion toEntity(final RegisterUnknownQuestion register);
}
