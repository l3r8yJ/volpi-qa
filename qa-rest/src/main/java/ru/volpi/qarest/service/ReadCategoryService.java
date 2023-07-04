package ru.volpi.qarest.service;

import ru.volpi.qarest.dto.category.CategoryName;
import ru.volpi.qarest.dto.category.CategoryResponse;

import java.util.List;

public interface ReadCategoryService {

    CategoryResponse findCategoryById(Long id);

    CategoryResponse findCategoryByName(String name);

    List<CategoryResponse> findAllCategories();

    List<String> findAllCategoriesNames();
}
