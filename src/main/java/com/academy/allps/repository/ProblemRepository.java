package com.academy.allps.repository;

import com.academy.allps.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long>, ProblemRepositoryCustom {
}
