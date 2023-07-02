package ru.volpi.qaadmin.service.impl;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.volpi.qaadmin.TestcontainersTest;
import ru.volpi.qaadmin.dto.question.AnsweredQuestion;
import ru.volpi.qaadmin.dto.question.QuestionResponse;
import ru.volpi.qaadmin.repository.UnknownQuestionRepository;

import static org.assertj.core.api.Assertions.assertThat;

class UnknownQuestionServiceImplTest extends TestcontainersTest {

    @Autowired
    private UnknownQuestionServiceImpl unknownService;

    @Autowired
    private UnknownQuestionRepository unknownQuestionRepository;

    @Test
    @DisplayName("Adds answer to unknown question")
    void addsAnswer() {
        final String answerPhrase = "Ответ на ваш вопрос";
        final String secondCategory = "Вторая категория";
        final String questionText = "Мой новый вопрос";
        final QuestionResponse actual = this.unknownService.addAnswer(
            new AnsweredQuestion(111L, questionText, answerPhrase, secondCategory)
        );
        assertThat(this.unknownQuestionRepository.findById(111L).isPresent()).isFalse();
        assertThat(actual.answer()).isEqualTo(answerPhrase);
        assertThat(actual.text()).isEqualTo(questionText);
        assertThat(actual.categoryName()).isEqualTo(secondCategory);
    }

}