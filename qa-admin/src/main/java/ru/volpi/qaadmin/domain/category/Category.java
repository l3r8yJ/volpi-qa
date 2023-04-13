package ru.volpi.qaadmin.domain.category;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import ru.volpi.qaadmin.domain.question.Question;
import ru.volpi.qaadmin.dto.category.CategoryRegistration;
import ru.volpi.qaadmin.dto.category.CategoryUpdate;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(schema = "categories_storage", name = "categories")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Category implements Serializable {

    @Serial
    private static final long serialVersionUID = -8520380017271706042L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name")
    private String name;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = {
        CascadeType.MERGE,
        CascadeType.REMOVE
    })
    @ToString.Exclude
    @Builder.Default
    private Set<Question> questions = new HashSet<>(0);

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || !Objects.equals(Hibernate.getClass(this), Hibernate.getClass(obj))) {
            return false;
        }
        final Category category = (Category) obj;
        return this.id != null && Objects.equals(this.id, category.id);
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}
