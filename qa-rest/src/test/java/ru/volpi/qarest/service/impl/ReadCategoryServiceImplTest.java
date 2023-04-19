package ru.volpi.qarest.service.impl;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.volpi.qarest.TestcontainersTest;
import ru.volpi.qarest.dto.category.CategoryResponse;
import ru.volpi.qarest.exception.category.CategoryNotFoundException;
import ru.volpi.qarest.service.ReadCategoryService;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Test case for {@link ReadCategoryService}.
 */
class ReadCategoryServiceImplTest extends TestcontainersTest {

    private static final int NUMBER_OF_CATEGORIES = 2;

    private static final long EXISTING_CATEGORY_ID = 1230L;

    private static final long NOT_EXISTING_CATEGORY_ID = 123L;

    private static final String EXISTING_CATEGORY_NAME = "Первая категория";

    private static final String NOT_EXISTING_CATEGORY_NAME = "Меня не существует";

    @Autowired
    private ReadCategoryService categoryService;

    @Test
    @DisplayName("Finds an existing category by id")
    void findsExistingCategoryById() {
        final CategoryResponse actual =
            this.categoryService.findCategoryById(EXISTING_CATEGORY_ID);
        assertThat(actual).isNotNull();
        assertThat(actual.name()).isEqualTo(EXISTING_CATEGORY_NAME);
    }

    @Test
    @DisplayName("Doesn't find a category that doesn't exist by id, throws an exception")
    void doesntFindExistingCategoryByIdAndThrowsException() {
        assertThrows(
            CategoryNotFoundException.class,
            () -> this.categoryService.findCategoryById(NOT_EXISTING_CATEGORY_ID),
            "Категория с id '%d' не найдена".formatted(NOT_EXISTING_CATEGORY_ID)
        );
    }

    @Test
    @DisplayName("Finds an existing category by name")
    void findsExistingCategoryByName() {
        final CategoryResponse actual =
            this.categoryService.findCategoryByName(EXISTING_CATEGORY_NAME);
        assertThat(actual).isNotNull();
        assertThat(actual.name()).isEqualTo(EXISTING_CATEGORY_NAME);
    }

    @Test
    @DisplayName("Doesn't find a category that doesn't exist by name, throws an exception")
    void doesntFindExistingCategoryByNameAndThrowsException() {
        assertThrows(
            CategoryNotFoundException.class,
            () -> this.categoryService.findCategoryByName(NOT_EXISTING_CATEGORY_NAME),
            "Категория с именем '%s' не найдена".formatted(NOT_EXISTING_CATEGORY_NAME)
        );
    }

    @Test
    @DisplayName("Finds all categories")
    void findsAllCategories() {
        assertThat(this.categoryService.findAllCategories()).hasSize(NUMBER_OF_CATEGORIES);
    }
}
