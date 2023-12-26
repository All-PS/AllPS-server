package com.academy.allps.dto;

import java.util.List;
import com.academy.allps.type.CategoryType;
import com.academy.allps.type.DifficultyType;
import com.academy.allps.type.OrderBy;
import com.academy.allps.type.PlatformType;
import com.academy.allps.type.SortCondition;
import lombok.Data;

@Data
public class RequestDto {
    List<PlatformType> platforms;
    List<DifficultyType> difficulties;
    List<CategoryType> categories;
    Long page;
    SortCondition sortCondition;
    OrderBy orderBy;
}
