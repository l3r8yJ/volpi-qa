package ru.volpi.qarest.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qarest.dto.category.CategoryResponse;
import ru.volpi.qarest.exception.category.CategoryNotFoundException;
import ru.volpi.qarest.repository.category.CategoryRepository;
import ru.volpi.qarest.service.ReadCategoryService;
import ru.volpi.qarest.service.annotation.TransactionalService;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@TransactionalService
public class ReadCategoryServiceImpl implements ReadCategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    @Override
    public CategoryResponse findCategoryById(final Long id) {
        return this.categoryRepository.findById(id)
            .map(CategoryResponse::from)
            .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Transactional
    @Override
    public CategoryResponse findCategoryByName(final String name) {
        return this.categoryRepository.findCategoryByNameIgnoreCase(name)
            .map(CategoryResponse::from)
            .orElseThrow(() -> new CategoryNotFoundException(name));
    }

    @Transactional
    @Override
    public List<CategoryResponse> findAllCategories() {
        return this.categoryRepository.findAll()
            .stream().map(CategoryResponse::from).toList();
    }

    @Override
    public List<String> findAllCategoriesNames() {
        return this.categoryRepository.findAllCategoriesNames();
    }
}
