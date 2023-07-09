package ru.volpi.qarest.web.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.volpi.qarest.service.ReadCategoryService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
@RestController
public class CategoriesController {

    private final ReadCategoryService categoryService;

    @GetMapping
    public final ResponseEntity<?> allCategories() {
        return ResponseEntity.ok(this.categoryService.findAllCategories());
    }

    @GetMapping("/by-name/{name}")
    public final ResponseEntity<?> categoryByName(@PathVariable final String name) {
        return ResponseEntity.ok(this.categoryService.findCategoryByName(name));
    }

    @GetMapping("/{id}")
    public final ResponseEntity<?> categoryById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.categoryService.findCategoryById(id));
    }

    @GetMapping("/names")
    public final ResponseEntity<List<String>> allCategoriesNames() {
        return ResponseEntity.ok(this.categoryService.findAllCategoriesNames());
    }
}
