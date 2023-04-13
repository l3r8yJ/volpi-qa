package ru.volpi.qaadmin.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;
import ru.volpi.qaadmin.service.CategoryService;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
@RestController
public class CategoriesRestController {

    private final CategoryService categoryService;

    @GetMapping
    public final ResponseEntity<?> allCategories() {
        return ResponseEntity.ok(this.categoryService.findAll());
    }

    @GetMapping("/{name}")
    public final ResponseEntity<?> categoryByName(@PathVariable final String name) {
        return ResponseEntity.ok(this.categoryService.findCategoryByName(name));
    }

    @PutMapping
    public final ResponseEntity<?> createCategory(@RequestBody final CategoryRegistration registration) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(this.categoryService.save(registration));
    }

    @PatchMapping("/{id}")
    public final ResponseEntity<?> updateCategory(
        @PathVariable final Long id,
        @RequestBody final CategoryUpdate update
    ) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(this.categoryService.update(id, update));
    }

    @DeleteMapping("/{id}")
    public final ResponseEntity<?> deleteCategory(@PathVariable final Long id) {
        return ResponseEntity.status(HttpStatus.ACCEPTED)
            .body(this.categoryService.deleteById(id));
    }
}
