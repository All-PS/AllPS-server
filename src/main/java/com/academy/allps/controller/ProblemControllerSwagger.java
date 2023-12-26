package com.academy.allps.controller;

import com.academy.allps.dto.RequestDto;
import com.academy.allps.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;

@Tag(name = "Problem", description = "Problem API")
public interface ProblemControllerSwagger {

    @Operation(summary = "문제 검색", description = "특정 조건에 맞는 문제의 목록을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 성공",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ResponseDto.class)))
    })
    ResponseDto searchProblems(
            @Parameter(description = "검색어", example = "A+B") String query,
            @Parameter(description = "검색타입", example = "name") String type,
            @RequestBody(content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)) RequestDto requestDto);
}
