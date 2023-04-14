package ru.volpi.qaadmin.web.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.volpi.qaadmin.TestcontainersTest;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class QuestionsRestControllerTest extends TestcontainersTest {

    private static final String QUESTIONS
        = "/api/v1/questions";

    private static final String QUESTIONS_BY_FIRST_CATEGORY
        = "/api/v1/questions/by-category/Первая категория";

    private static final String FIRST_QUESTION_ID
        = "/api/v1/questions/324";

    private static final String SECOND_QUESTION_ID
        = "/api/v1/questions/431";

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Gets all questions")
    void findsAllQuestions() throws Exception {
        this.mockMvc.perform(get(QUESTIONS)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Gets questions by category name")
    void findsQuestionsByCategoryName() throws Exception {
        final String content = this.mockMvc.perform(get(QUESTIONS_BY_FIRST_CATEGORY))
            .andExpect(status().isOk()).andReturn().getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Вопрос уровня а");
    }

    @Test
    @DisplayName("Get question by id")
    void findsQuestionById() throws Exception {
        final String content = this.mockMvc.perform(get(FIRST_QUESTION_ID))
            .andExpect(status().isOk()).andReturn().getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Вопрос уровня а");
    }

    @Test
    @DisplayName("Crates question")
    void createsQuestion() throws Exception{
        this.mockMvc.perform(
            put(QUESTIONS)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
                .content("""
                {
                    "text": "Новый вопрос",
                    "answer": "Новый вопрос",
                    "category": {
                        "name": "Первая категория"
                    }
                }
                """)
        ).andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Updates question by id")
    void updatesQuestionById() throws Exception {
        this.mockMvc.perform(
            patch(FIRST_QUESTION_ID)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
                .content("""
                    {
                        "text": "Обновленный текст",
                        "answer": "Новый вопрос",
                        "category": {
                            "name": "Вторая категория"
                        }
                    }
                    """)
        ).andExpect(status().isAccepted());
    }

    @Test
    @DisplayName("Deletes question by id")
    void deletesQuestionById() throws Exception {
        this.mockMvc.perform(delete(SECOND_QUESTION_ID))
            .andExpect(status().isAccepted());
    }
}