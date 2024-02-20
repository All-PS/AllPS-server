package com.academy.allps.repository;

import com.academy.allps.dto.ProblemDto;
import com.academy.allps.type.QueryType;
import com.academy.allps.dto.RequestDto;
import java.util.List;

public interface ProblemRepositoryCustom {

    List<ProblemDto> findMatchedProblems(String query, QueryType type, RequestDto requestDto);
    Long findMatchedProblemCounts(String query, QueryType type, RequestDto requestDto);
    List<ProblemDto> findMatchedProblemsById(List<Long> problemIds);
}
