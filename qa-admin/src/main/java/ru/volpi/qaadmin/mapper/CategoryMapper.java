package ru.volpi.qaadmin.mapper;

import org.mapstruct.Mapper;
import ru.volpi.qaadmin.domain.category.Category;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryResponse;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponse toCategoryResponse(Category category);

    Category toEntity(CategoryRegistration registration);

    Category toEntity(CategoryUpdate update);
}
