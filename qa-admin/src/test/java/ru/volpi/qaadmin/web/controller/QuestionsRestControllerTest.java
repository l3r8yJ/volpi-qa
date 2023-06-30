package ru.volpi.qaadmin.web.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import ru.volpi.qaadmin.TestcontainersTest;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class QuestionsRestControllerTest extends TestcontainersTest {

    private static final String QUESTIONS
        = "/api/v1/admin/questions";

    private static final String QUESTIONS_BY_FIRST_CATEGORY
        = "/api/v1/admin/questions/by-category/Первая категория";

    private static final String FIRST_QUESTION_ID
        = "/api/v1/admin/questions/324";

    private static final String SECOND_QUESTION_ID
        = "/api/v1/admin/questions/431";

    private static final String ADD_ANSWER_URL
        = "/api/v1/admin/questions/answer";

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser("admin")
    @DisplayName("Gets all questions")
    void findsAllQuestions() throws Exception {
        this.mockMvc.perform(get(QUESTIONS)).andExpect(status().isOk());
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Gets questions by category username")
    void findsQuestionsByCategoryName() throws Exception {
        final String content = this.mockMvc.perform(get(QUESTIONS_BY_FIRST_CATEGORY))
            .andExpect(status().isOk()).andReturn().getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Вопрос уровня а");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Get question by id")
    void findsQuestionById() throws Exception {
        final String content = this.mockMvc.perform(get(FIRST_QUESTION_ID))
            .andExpect(status().isOk()).andReturn().getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Вопрос уровня а");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Crates question")
    void createsQuestion() throws Exception {
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
    @WithMockUser("admin")
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
    @WithMockUser("admin")
    @DisplayName("Deletes question by id")
    void deletesQuestionById() throws Exception {
        this.mockMvc.perform(delete(SECOND_QUESTION_ID))
            .andExpect(status().isAccepted());
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Adds answer to unknown question")
    void addsAnswerToUnknownQuestion() throws Exception {
        final String response = this.mockMvc.perform(
                patch(ADD_ANSWER_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding(StandardCharsets.UTF_8)
                    .content("""
                        {
                            "unknownQuestionId": 111,
                            "text": "Ответ на вопрос",
                            "category": "Первая категория"               
                        }
                        """)
            ).andExpect(status().isAccepted())
            .andReturn()
            .getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(response)
            .containsIgnoringCase("ответ на вопрос")
            .containsIgnoringCase("первая категория");
    }
}