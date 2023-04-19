package ru.volpi.qarest.web.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import ru.volpi.qarest.TestcontainersTest;
import ru.volpi.qarest.web.controller.util.AssertUtil;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
class QuestionsControllerTest extends TestcontainersTest {

    private static final String QUESTIONS = "/api/v1/questions";

    private static final String QUESTION_BY_ID = "/api/v1/questions/324";

    private static final String NOT_EXISTING_QUESTION_BY_ID = "/api/v1/questions/101";

    private static final String QUESTION_BY_TEXT = "/api/v1/questions/by-text/Вопрос уровня а";

    private static final String NOT_EXISTING_QUESTION_BY_TEXT = "/api/v1/questions/by-text/abc";

    private static final String QUESTIONS_BY_CATEGORY = "/api/v1/questions/by-category/Первая категория";


    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Gets all questions")
    void getsAllQuestions() throws Exception {
        this.assertUrl(QUESTIONS, status().isOk());
    }

    @Test
    @DisplayName("Gets question by id")
    void getsQuestionById() throws Exception {
        this.assertUrl(QUESTION_BY_ID, status().isOk());
    }

    @Test
    @DisplayName("Return not found when question by id isn't found")
    void getsQuestionByIdNotFound() throws Exception {
        this.assertUrl(NOT_EXISTING_QUESTION_BY_ID, status().isNotFound());
    }

    @Test
    @DisplayName("Gets question by text")
    void getsQuestionByText() throws Exception {
        this.assertUrl(QUESTION_BY_TEXT, status().isOk());
    }

    @Test
    @DisplayName("Return not found when question by text isn't found")
    void getsQuestionByTextNotFound() throws Exception {
        this.assertUrl(NOT_EXISTING_QUESTION_BY_TEXT, status().isNotFound());
    }

    @Test
    @DisplayName("Gets questions by category name")
    void questionsByCategoryName() throws Exception {
        this.assertUrl(QUESTIONS_BY_CATEGORY, status().isOk());
    }

    private void assertUrl(final String url, final ResultMatcher matcher) throws Exception {
        AssertUtil.assertUrlWithMock(this.mockMvc, url, matcher);
    }
}

