package ru.volpi.qaadmin.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.category.Category;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;
import ru.volpi.qaadmin.exception.category.CategoryAlreadyExistException;
import ru.volpi.qaadmin.exception.category.CategoryNotFoundException;
import ru.volpi.qaadmin.repository.CategoryRepository;
import ru.volpi.qaadmin.service.CategoryService;
import ru.volpi.qaadmin.service.annotation.TransactionalService;

import java.util.List;

@Slf4j
@TransactionalService
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    @Override
    public List<CategoryResponse> findAll() {
        return this.categoryRepository.findAll()
            .stream().map(CategoryResponse::from).toList();
    }

    @Transactional
    @Override
    public CategoryResponse save(CategoryRegistration registration) {
        if (this.categoryRepository.existsByName(registration.name())) {
            throw new CategoryAlreadyExistException(registration.name());
        }
        final Category category = Category.from(registration);
        return CategoryResponse.from(this.categoryRepository.save(category));
    }

    @Transactional
    @Override
    public CategoryResponse update(Long id, CategoryUpdate update) {
        return this.categoryRepository.findById(id)
            .map(entity -> Category.builder().id(id).name(update.name()).build())
            .map(this.categoryRepository::saveAndFlush)
            .map(CategoryResponse::from)
            .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Transactional
    @Override
    public CategoryResponse findCategoryByName(final String name) {
        return this.categoryRepository.findByNameIgnoreCase(name)
            .map(CategoryResponse::from)
            .orElseThrow(() -> new CategoryNotFoundException(name));
    }

    @Transactional
    @Override
    public Long deleteCategoryById(final Long id) {
        if (!this.categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException(id);
        }
        this.categoryRepository.deleteById(id);
        return id;
    }
}
