package com.academy.allps.dto;

import java.util.List;
import lombok.Data;

@Data
public class ProblemSearchCondition {
    String searchQuery;
    String searchType;
    List<String> platforms;
    List<String> difficulties;
    List<String> categories;
    Integer page;
    String sortCondition;
    String orderBy;


    public ProblemSearchCondition(String query, String type, RequestDto requestDto) {
        this.searchQuery = query;
        this.searchType = type;
        this.platforms = requestDto.platforms;
        this.difficulties = requestDto.difficulties;
        this.categories = requestDto.categories;
        this.page = requestDto.page;
        this.sortCondition = requestDto.sortCondition;
        this.orderBy = requestDto.orderBy;
    }
}
