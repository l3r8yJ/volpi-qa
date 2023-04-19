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
class CategoriesControllerTest extends TestcontainersTest {

    private static final String ALL_CATEGORIES = "/api/v1/categories";

    private static final String EXISTING_CATEGORY_BY_NAME = "/api/v1/categories/by-name/Первая категория";

    private static final String NOT_EXISTING_CATEGORY_BY_NAME = "/api/v1/categories/by-name/abc";

    private static final String EXISTING_CATEGORY_BY_ID = "/api/v1/categories/1230";

    private static final String NOT_EXISTING_CATEGORY_BY_ID = "/api/v1/categories/10";


    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Gets all categories")
    void getsAllCategories() throws Exception {
        this.assertUrl(ALL_CATEGORIES, status().isOk());
    }

    @Test
    @DisplayName("Gets category by name")
    void getsCategoryByName() throws Exception {
        this.assertUrl(EXISTING_CATEGORY_BY_NAME, status().isOk());
    }

    @Test
    @DisplayName("Returns not found when category not found by name")
    void getsNotExistingCategoryByName() throws Exception {
        this.assertUrl(NOT_EXISTING_CATEGORY_BY_NAME, status().isNotFound());
    }

    @Test
    @DisplayName("Gets category by id")
    void getsCategoryById() throws Exception {
        this.assertUrl(EXISTING_CATEGORY_BY_ID, status().isOk());
    }

    @Test
    @DisplayName("Returns not found when category not found by id")
    void getsNotExistingCategoryById() throws Exception {
        this.assertUrl(NOT_EXISTING_CATEGORY_BY_ID, status().isNotFound());
    }

    private void assertUrl(final String url, final ResultMatcher matcher) throws Exception {
        AssertUtil.assertUrlWithMock(this.mockMvc, url, matcher);
    }
}
