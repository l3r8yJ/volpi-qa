package ru.volpi.qaadmin.service.impl;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import ru.volpi.qaadmin.domain.category.Categories;
import ru.volpi.qaadmin.domain.category.Category;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;
import ru.volpi.qaadmin.exception.category.CategoryAlreadyExistException;
import ru.volpi.qaadmin.exception.category.CategoryNotFoundException;
import ru.volpi.qaadmin.exception.category.CategoryValidationException;
import ru.volpi.qaadmin.repository.CategoryRepository;
import ru.volpi.qaadmin.service.CategoryService;
import ru.volpi.qaadmin.service.annotation.TransactionalService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@TransactionalService
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final Validator validator;

    @Transactional
    @Override
    public List<CategoryResponse> findAll() {
        return this.categoryRepository.findAll()
            .stream().map(CategoryResponse::from).toList();
    }

    @Transactional
    @Override
    public CategoryResponse save(final CategoryRegistration registration) {
        if (this.categoryRepository.existsByName(registration.name())) {
            throw new CategoryAlreadyExistException(registration.name());
        }
        final Set<ConstraintViolation<CategoryRegistration>> violations
            = this.validator.validate(registration);
        if (!violations.isEmpty()) {
            throw new CategoryValidationException(violations);
        }
        final Category category = Categories.from(registration);
        return CategoryResponse.from(this.categoryRepository.save(category));
    }

    @Transactional
    @Override
    public CategoryResponse update(final Long id, final CategoryUpdate update) {
        final Set<ConstraintViolation<CategoryUpdate>> violations
            = this.validator.validate(update);
        if (!violations.isEmpty()) {
            throw new CategoryValidationException(
                violations.stream().map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining("\n"))
            );
        }
        return this.categoryRepository.findById(id)
            .map(entity -> Categories.of(id, update))
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
    public Long deleteById(final Long id) {
        if (!this.categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException(id);
        }
        this.categoryRepository.deleteById(id);
        return id;
    }

    @Transactional
    @Override
    public Long categoryIdByName(final String name) {
        return this.categoryRepository.findByNameIgnoreCase(name)
            .map(Category::getId)
            .orElseThrow(() -> new CategoryNotFoundException(name));
    }
}
