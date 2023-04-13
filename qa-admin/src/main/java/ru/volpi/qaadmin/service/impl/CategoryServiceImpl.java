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
import ru.volpi.qaadmin.mapper.CategoryMapper;
import ru.volpi.qaadmin.repository.CategoryRepository;
import ru.volpi.qaadmin.service.CategoryService;
import ru.volpi.qaadmin.service.annotation.TransactionalService;

import java.util.List;

@Slf4j
@TransactionalService
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    @Transactional
    @Override
    public List<CategoryResponse> findAll() {
        return this.categoryRepository.findAll()
            .stream().map(this.categoryMapper::toCategoryResponse).toList();
    }

    @Transactional
    @Override
    public CategoryResponse save(CategoryRegistration registration) {
        if (this.categoryRepository.existsByName(registration.name())) {
            throw new CategoryAlreadyExistException(registration.name());
        }
        final Category category = this.categoryMapper.toEntity(registration);
        return this.categoryMapper.toCategoryResponse(
            this.categoryRepository.save(category)
        );
    }

    @Transactional
    @Override
    public CategoryResponse update(Long id, CategoryUpdate update) {
        return this.categoryRepository.findById(id)
            .map(entity -> {
                final Category updated = this.categoryMapper.toEntity(update);
                updated.setId(id);
                return updated;
            })
            .map(this.categoryRepository::saveAndFlush)
            .map(this.categoryMapper::toCategoryResponse)
            .orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Transactional
    @Override
    public CategoryResponse findCategoryByName(final String name) {
        return this.categoryRepository.findByNameIgnoreCase(name)
            .map(this.categoryMapper::toCategoryResponse)
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
