package com.academy.allps.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ResponseDto {
    private long page;
    private long lastPage;
    private List<ProblemDto> problems;
}
