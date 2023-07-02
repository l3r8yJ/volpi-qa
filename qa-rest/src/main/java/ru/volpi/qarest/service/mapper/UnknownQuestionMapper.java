package ru.volpi.qarest.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import ru.volpi.qarest.domain.question.UnknownQuestion;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UnknownQuestionMapper {
    UnknownQuestion toEntity(RegisterUnknownQuestion register);
}
