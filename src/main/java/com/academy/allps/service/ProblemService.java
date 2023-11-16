package com.academy.allps.service;

import com.academy.allps.dto.ProblemDto;
import com.academy.allps.dto.ProblemSearchCondition;
import com.academy.allps.dto.ResponseDto;
import com.academy.allps.repository.ProblemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProblemService {
    private final ProblemRepository problemRepository;

    public ResponseDto getMatchedProblems(ProblemSearchCondition problemSearchCondition) {

        List<ProblemDto> problems = problemRepository.searchProblems(problemSearchCondition);

        int page = problemSearchCondition.getPage();
        int totalProblems = problemRepository.searchProblemCount(problemSearchCondition).intValue();
        int totalPages = (int) Math.ceil((double) totalProblems / 20);

        return new ResponseDto(page, totalPages, problems);
    }
}
