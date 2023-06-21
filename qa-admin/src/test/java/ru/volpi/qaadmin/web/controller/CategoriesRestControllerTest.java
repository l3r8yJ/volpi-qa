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
import static ru.volpi.qaadmin.validation.message.CategoryMessages.CATEGORY_CANNOT_BE_EMPTY;

@AutoConfigureMockMvc
final class CategoriesRestControllerTest extends TestcontainersTest {

    private static final String CATEGORIES
        = "/api/v1/admin/categories";

    private static final String FIRST_CATEGORY
        = "/api/v1/admin/categories/Первая категория";

    private static final String FIRST_CATEGORY_ID
        = "/api/v1/admin/categories/1230";

    private static final String SECOND_CATEGORY_ID
        = "/api/v1/admin/categories/3421";

    private static final String NON_EXISTING_CATEGORY
        = "/api/v1/admin/categories/mess";

    private static final String NON_EXISTING_CATEGORY_ID
        = "/api/v1/admin/categories/101";

    private static final String BAD_CATEGORY_NAME
        = "ashslhdflshdf j hsldhfl hsdfhsldkfhkl sdhlf lsdfh lshdfl hsdlfkh lsdhf ljshd fljhlsdf";

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser("admin")
    @DisplayName("Gets all categories")
    void getsAllCategories() throws Exception {
        final String content = this.mockMvc.perform(get(CATEGORIES))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Первая категория", "Вторая категория");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Gets first category by username")
    void getsCategoryByName() throws Exception {
        final String content = this.mockMvc.perform(get(FIRST_CATEGORY))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Первая категория");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Not found when category not exist")
    void getsNonExistingCategoryByName() throws Exception {
        this.mockMvc.perform(get(NON_EXISTING_CATEGORY)).andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Correctly creates category")
    void createsCategory() throws Exception {
        final String content = this.mockMvc.perform(
                put(CATEGORIES)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ \"name\": \"Новая категория\" }")
                    .characterEncoding(StandardCharsets.UTF_8)
            ).andExpect(status().isCreated()).andReturn()
            .getResponse().getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Новая категория");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Handles existing category creation")
    void triesCreateExistingCategory() throws Exception {
        final String content = this.mockMvc.perform(
                put(CATEGORIES)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ \"name\": \"Первая категория\" }")
                    .characterEncoding(StandardCharsets.UTF_8)
            ).andExpect(status().isConflict()).andReturn()
            .getResponse().getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Категория с именем 'Первая категория' уже существует!");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Handles empty category creation")
    void triesCreateEmptyCategory() throws Exception {
        final String content = this.mockMvc.perform(
                put(CATEGORIES)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ \"name\": \"\" }")
                    .characterEncoding(StandardCharsets.UTF_8)
            ).andExpect(status().isBadRequest()).andReturn()
            .getResponse().getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains(CATEGORY_CANNOT_BE_EMPTY);
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Creates category with bad name")
    void triesCreateBigCategory() throws Exception {
        this.mockMvc.perform(
                put(CATEGORIES)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                            {
                                "name": "%s"
                            }
                            """.formatted(BAD_CATEGORY_NAME)
                    )
                    .characterEncoding(StandardCharsets.UTF_8)
            ).andExpect(status().isCreated());
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Patches category")
    void patchesCategory() throws Exception {
        this.mockMvc.perform(
            patch(FIRST_CATEGORY_ID)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ \"name\": \"Новая первая категория\" }")
                .characterEncoding(StandardCharsets.UTF_8)
        ).andExpect(status().isAccepted());
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Patches not existing category")
    void patchesNonExistingCategory() throws Exception {
        final String content = this.mockMvc.perform(
                patch(NON_EXISTING_CATEGORY_ID)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ \"name\": \"Новая первая категория\" }")
                    .characterEncoding(StandardCharsets.UTF_8)
            ).andExpect(status().isNotFound()).andReturn()
            .getResponse().getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains("Категория с id '101' не найдена");
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Patches not valid data")
    void patchesNotValidData() throws Exception {
        final String content = this.mockMvc.perform(
                patch(NON_EXISTING_CATEGORY_ID)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ \"name\": \"\" }")
                    .characterEncoding(StandardCharsets.UTF_8)
            ).andExpect(status().isBadRequest()).andReturn()
            .getResponse().getContentAsString(StandardCharsets.UTF_8);
        assertThat(content).contains(CATEGORY_CANNOT_BE_EMPTY);
    }

    @Test
    @WithMockUser("admin")
    @DisplayName("Delete category")
    void deleteCategory() throws Exception {
        this.mockMvc.perform(delete(SECOND_CATEGORY_ID))
            .andExpect(status().isAccepted());
    }
}
