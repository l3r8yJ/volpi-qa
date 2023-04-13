package ru.volpi.qaadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.volpi.qaadmin.domain.question.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
