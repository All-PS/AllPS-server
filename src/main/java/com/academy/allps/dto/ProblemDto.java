package com.academy.allps.dto;

import java.util.List;
import lombok.Data;

@Data
public class ProblemDto {
    private Long id;
    private String code;
    private String name;
    private String url;
    private String difficulty;
    private String platform;
    private List<String> categories;

    public ProblemDto(Long id, String code, String name, String url, String difficulty, String platform) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.url = url;
        this.difficulty = difficulty;
        this.platform = platform;
    }
}
