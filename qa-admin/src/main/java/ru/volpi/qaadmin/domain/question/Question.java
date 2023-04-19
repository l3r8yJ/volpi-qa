package ru.volpi.qaadmin.domain.question;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import ru.volpi.qaadmin.domain.category.Category;

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
    private static final long serialVersionUID = 122845675055226605L;

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
        final boolean result;
        if (this == obj) {
            result = true;
        } else if (obj == null || !Objects.equals(Hibernate.getClass(this), Hibernate.getClass(obj))) {
            result = false;
        } else {
            final Question question = (Question) obj;
            result = this.id != null && Objects.equals(this.id, question.id);
        }
        return result;
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }
}
