package ru.volpi.qaadmin.domain.question;

import lombok.experimental.UtilityClass;
import ru.volpi.qaadmin.domain.category.Categories;
import ru.volpi.qaadmin.dto.question.QuestionRegistration;
import ru.volpi.qaadmin.dto.question.QuestionUpdate;

@UtilityClass
public class Questions {
    public static Question of(final Long id, final QuestionUpdate update) {
        return Question.builder()
            .id(id)
            .text(update.text())
            .answer(update.answer())
            .category(Categories.from(update.category()))
            .build();
    }

    public static Question from(final QuestionRegistration registration) {
        return Question.builder()
            .text(registration.text())
            .answer(registration.answer())
            .category(Categories.from(registration.category()))
            .build();
    }
}
