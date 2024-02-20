package com.academy.allps.service;

import static com.academy.allps.repository.ProblemRepositoryCustomImpl.PAGE_SIZE;

import java.util.List;
import com.academy.allps.dto.ProblemDto;
import com.academy.allps.type.QueryType;
import com.academy.allps.dto.RequestDto;
import com.academy.allps.dto.ResponseDto;
import com.academy.allps.repository.ProblemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ProblemService {
    private final ProblemRepository problemRepository;

    public ResponseDto getMatchedProblems(String query, QueryType type, RequestDto requestDto) {

        long totalPages = calculateTotalPages(query, type, requestDto);
        List<ProblemDto> problems = problemRepository.findMatchedProblems(query, type, requestDto);

        return new ResponseDto(requestDto.getPage(), totalPages, problems);
    }

    private int calculateTotalPages(String query, QueryType type, RequestDto requestDto) {
        Long matchedProblemCounts = problemRepository.findMatchedProblemCounts(query, type, requestDto);
        return (int) Math.ceil((double) matchedProblemCounts / PAGE_SIZE);
    }

    public List<ProblemDto> getMatchedProblems(List<Long> problemIds) {

        return problemRepository.findMatchedProblemsById(problemIds);
    }
}
