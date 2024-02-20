package com.academy.allps.controller;

import com.academy.allps.dto.ProblemDto;
import com.academy.allps.type.QueryType;
import com.academy.allps.dto.RequestDto;
import com.academy.allps.dto.ResponseDto;
import com.academy.allps.service.ProblemService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@CrossOrigin(origins = "https://www.allps.io")
@RestController
public class ProblemController implements ProblemControllerSwagger {
    private final ProblemService problemService;

    @PostMapping("/search")
    public ResponseDto searchProblems(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) QueryType type,
            @RequestBody(required = true) RequestDto requestDto) {

        return problemService.getMatchedProblems(query, type, requestDto);
    }

    @GetMapping("/get")
    public List<ProblemDto> getProblems(@RequestParam List<Long> problems) {

        return problemService.getMatchedProblems(problems);
    }
}
