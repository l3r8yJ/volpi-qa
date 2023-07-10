package ru.volpi.qarest.mapper;

import org.mapstruct.Mapper;
import ru.volpi.qarest.config.MapStructConfiguration;
import ru.volpi.qarest.domain.question.Question;
import ru.volpi.qarest.dto.question.QuestionResponse;

@Mapper(
    config = MapStructConfiguration.class,
    uses = CategoryMapper.class
)
public interface QuestionMapper {
    QuestionResponse toQuestionResponse(Question question);
}
