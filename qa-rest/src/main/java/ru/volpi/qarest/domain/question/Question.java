package ru.volpi.qarest.domain.question;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import ru.volpi.qarest.domain.category.Category;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(schema = "questions_storage", name = "questions")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@ToString
public class Question implements Serializable {

    @Serial
    private static final long serialVersionUID = 7880984102614629018L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_text")
    private String text;

    @Column(name = "question_answer")
    private String answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @ToString.Exclude
    private Category category;

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || !Objects.equals(Hibernate.getClass(this), Hibernate.getClass(obj))) {
            return false;
        }
        final Question question = (Question) obj;
        return this.id != null && Objects.equals(this.id, question.id);
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}
