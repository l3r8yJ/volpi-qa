package ru.volpi.qaadmin.validation.message;

import lombok.experimental.UtilityClass;

@UtilityClass
public class CategoryMessages {
    public static final String CATEGORY_CANNOT_BE_EMPTY
        = "Название категории не может быть пустым!";

    public static final String CATEGORY_NOT_PROVIDED
        = "Категория не указана";

    public static final String CATEGORY_NAME_TOO_LONG
        = "Название категории слишком длинное";
}
