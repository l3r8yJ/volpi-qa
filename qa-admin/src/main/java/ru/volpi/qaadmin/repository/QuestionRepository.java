package ru.volpi.qaadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volpi.qaadmin.domain.question.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
