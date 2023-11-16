package com.academy.allps.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponseDto {
    private int page;
    private int lastPage;
    private List<ProblemDto> problems;
}
