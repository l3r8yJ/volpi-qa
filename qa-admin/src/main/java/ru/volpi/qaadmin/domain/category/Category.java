package ru.volpi.qaadmin.domain.category;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import ru.volpi.qaadmin.domain.question.Question;

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
        final boolean result;
        if (this == obj) {
            result = true;
        } else if (obj == null || !Objects.equals(Hibernate.getClass(this), Hibernate.getClass(obj))) {
            result = false;
        } else {
            final Category category = (Category) obj;
            result = this.id != null && Objects.equals(this.id, category.id);
        }
        return result;
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}
