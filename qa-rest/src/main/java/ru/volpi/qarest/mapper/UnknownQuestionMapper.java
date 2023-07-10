package ru.volpi.qarest.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.volpi.qarest.config.MapStructConfiguration;
import ru.volpi.qarest.domain.question.UnknownQuestion;
import ru.volpi.qarest.dto.question.RegisterUnknownQuestion;

@Mapper(config = MapStructConfiguration.class)
public interface UnknownQuestionMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    UnknownQuestion toUnknownQuestion(RegisterUnknownQuestion register);
}
