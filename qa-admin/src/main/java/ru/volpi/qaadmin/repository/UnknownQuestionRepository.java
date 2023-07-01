package ru.volpi.qaadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.volpi.qaadmin.domain.question.UnknownQuestion;

public interface UnknownQuestionRepository extends JpaRepository<UnknownQuestion, Long> {
}
