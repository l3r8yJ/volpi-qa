package ru.volpi.qarest.repository.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.volpi.qarest.domain.question.Question;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    Optional<Question> findById(Long id);

    Optional<Question> findQuestionByName(String name);

    List<Question> findQuestionsByCategoryNameIgnoreCase(String name);
}
