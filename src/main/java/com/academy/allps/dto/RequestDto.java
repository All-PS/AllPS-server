package com.academy.allps.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestDto {
    List<String> platforms;
    List<String> difficulties;
    List<String> categories;
    Integer page;
    String sortCondition;
    String orderBy;
}
