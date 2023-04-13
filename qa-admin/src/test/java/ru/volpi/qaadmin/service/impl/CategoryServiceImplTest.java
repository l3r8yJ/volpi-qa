package ru.volpi.qaadmin.service.impl;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import ru.volpi.qaadmin.TestcontainersTest;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;
import ru.volpi.qaadmin.exception.category.CategoryAlreadyExistException;
import ru.volpi.qaadmin.exception.category.CategoryNotFoundException;
import ru.volpi.qaadmin.service.CategoryService;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class CategoryServiceImplTest extends TestcontainersTest {

    @Autowired
    private CategoryService categoryService;

    @Test
    @DisplayName("Searches all categories")
    void findsAllCategories() {
        assertThat(this.categoryService.findAll())
            .hasSize(2);
    }

    @Test
    @DisplayName("Save non conflicting category")
    void savesCategory() {
        assertThat(this.categoryService.save(new CategoryRegistration("Третья категория")))
            .isNotNull();
    }

    @Test
    @DisplayName("Save existing category correctly")
    void savesExistingCategory() {
        assertThrows(
            CategoryAlreadyExistException.class,
            () -> this.categoryService.save(new CategoryRegistration("Вторая категория")),
            "Категория с именем 'Вторая категория' уже существует!"
        );
    }

    @Test
    @DisplayName("Updates existing category")
    void updatesExistingCategory() {
        CategoryResponse update = this.categoryService.update(1230L, new CategoryUpdate("Новая Категория"));
        assertThat(update.name()).isEqualTo("Новая Категория");
    }

    @Test
    @DisplayName("Updates non existing category correctly")
    void updatesNonExistingCategoryCorrectly() {
        assertThrows(
            CategoryNotFoundException.class,
            () -> this.categoryService.update(43L, new CategoryUpdate("Новая Категория")),
            "Категория с id '43' не найдена\""
        );
    }

    @Test
    @DisplayName("Finds existing category")
    void findCategoryByName() {
        final CategoryResponse found = this.categoryService.findCategoryByName("Первая категория");
        assertThat(found).isNotNull().isInstanceOf(CategoryResponse.class);
        assertThat(found.name()).isEqualTo("Первая категория");
        assertThat(found.questions()).hasSize(1);
    }

    @Test
    @DisplayName("Not finds existing category")
    void findNonExistingCategoryByName() {
        assertThrows(
            CategoryNotFoundException.class,
            () -> this.categoryService.findCategoryByName("категория"),
            "Категория с именем 'категория' не найдена!"
        );
    }

    @Test
    @DisplayName("Deletes existing category")
    void deletesExistingCategory() {
        assertThat(this.categoryService.deleteById(3421L)).isEqualTo(3421L);
    }

    @Test
    @DisplayName("Deletes non existing category correctly")
    void deletesNonExistingCategoryCorrectly() {
        assertThrows(
            CategoryNotFoundException.class,
            () -> this.categoryService.deleteById(43L),
            "Категория с id '43' не найдена\""
        );
    }
}
