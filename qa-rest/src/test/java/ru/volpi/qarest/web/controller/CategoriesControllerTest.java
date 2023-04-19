package ru.volpi.qarest.web.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import ru.volpi.qarest.TestcontainersTest;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

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
        this.mockMvc.perform(get(ALL_CATEGORIES)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Gets category by name")
    void getsCategoryByName() throws Exception {
        this.mockMvc.perform(get(EXISTING_CATEGORY_BY_NAME)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Returns not found when category not found by name")
    void getsNotExistingCategoryByName() throws Exception {
        this.mockMvc.perform(get(NOT_EXISTING_CATEGORY_BY_NAME)).andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Gets category by id")
    void getsCategoryById() throws Exception {
        this.mockMvc.perform(get(EXISTING_CATEGORY_BY_ID)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("Returns not found when category not found by id")
    void getsNotExistingCategoryById() throws Exception {
        this.mockMvc.perform(get(NOT_EXISTING_CATEGORY_BY_ID)).andExpect(status().isNotFound());
    }
}
