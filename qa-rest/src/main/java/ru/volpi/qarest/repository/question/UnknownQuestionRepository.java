package ru.volpi.qarest.repository.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.volpi.qarest.domain.question.UnknownQuestion;

@Repository
public interface UnknownQuestionRepository extends JpaRepository<UnknownQuestion, Long> {
    boolean existsByText(String text);
}
