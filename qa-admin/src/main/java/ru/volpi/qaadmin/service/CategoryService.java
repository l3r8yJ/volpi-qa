package ru.volpi.qaadmin.service;

import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> findAll();

    CategoryResponse save(CategoryRegistration registration);

    CategoryResponse update(Long id, CategoryUpdate update);

    CategoryResponse findCategoryByName(String name);

    Long deleteById(Long id);
}
