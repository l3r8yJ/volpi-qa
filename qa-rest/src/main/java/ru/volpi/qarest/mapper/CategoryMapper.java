package ru.volpi.qarest.mapper;

import org.mapstruct.Mapper;
import ru.volpi.qarest.config.MapStructConfiguration;
import ru.volpi.qarest.domain.category.Category;
import ru.volpi.qarest.dto.category.CategoryResponse;

@Mapper(config = MapStructConfiguration.class)
public interface CategoryMapper {

    CategoryResponse toCategoryResponse(Category category);

    String categoryToString(Category category);
}
