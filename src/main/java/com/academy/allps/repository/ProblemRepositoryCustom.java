package com.academy.allps.repository;

import com.academy.allps.dto.ProblemDto;
import com.academy.allps.dto.ProblemSearchCondition;
import java.util.List;

public interface ProblemRepositoryCustom {

    List<ProblemDto> searchProblems(ProblemSearchCondition searchCondition);

    Long searchProblemCount(ProblemSearchCondition searchCondition);
}
