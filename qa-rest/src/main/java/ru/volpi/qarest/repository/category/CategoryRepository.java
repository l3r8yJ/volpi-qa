package ru.volpi.qarest.repository.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.volpi.qarest.domain.category.Category;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findCategoryByNameIgnoreCase(String name);

    @Query("select name from Category")
    List<String> findAllCategoriesNames();
}
