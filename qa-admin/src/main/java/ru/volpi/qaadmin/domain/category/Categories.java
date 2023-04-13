package ru.volpi.qaadmin.domain.category;

import lombok.experimental.UtilityClass;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;

@UtilityClass
public class Categories {
    public static Category from(final CategoryRegistration registration) {
        return Category.builder().name(registration.name()).build();
    }

    public static Category from(final CategoryUpdate update) {
        return Category.builder().name(update.name()).build();
    }

    public static Category of(final Long id, final CategoryUpdate update) {
        return Category.builder().id(id).name(update.name()).build();
    }
}
