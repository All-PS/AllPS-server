package com.academy.allps.dto;

import java.util.ArrayList;
import java.util.List;
import com.academy.allps.type.CategoryType;
import com.academy.allps.type.DifficultyType;
import com.academy.allps.type.PlatformType;
import lombok.Data;

@Data
public class ProblemDto {

    private Long id;
    private String code;
    private String name;
    private String url;
    private Long solvedCount;
    private PlatformType platform;
    private DifficultyType difficulty;
    private List<CategoryType> categories;

    public ProblemDto(Long id,
                      String code,
                      String name,
                      String url,
                      Long solvedCount,
                      PlatformType platform,
                      DifficultyType difficulty) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.url = url;
        this.solvedCount = solvedCount;
        this.platform = platform;
        this.difficulty = difficulty;
        this.categories = new ArrayList<>();
    }
}
