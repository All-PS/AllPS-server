package com.academy.allps.controller;

import com.academy.allps.dto.ProblemSearchCondition;
import com.academy.allps.dto.RequestDto;
import com.academy.allps.dto.ResponseDto;
import com.academy.allps.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "https://allps.io")
public class ProblemController {
    private final ProblemService problemService;

    @PostMapping("/search")
    public ResponseDto searchProblems(@RequestParam(required = false) String query,
                                       @RequestParam(required = false) String type,
                                       @RequestBody RequestDto requestDto) {

        ProblemSearchCondition problemSearchCondition = new ProblemSearchCondition(query, type, requestDto);
        ResponseDto matchedProblems = problemService.getMatchedProblems(problemSearchCondition);
        return matchedProblems;
    }
}
