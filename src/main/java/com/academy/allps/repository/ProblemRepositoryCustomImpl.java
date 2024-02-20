package com.academy.allps.repository;

import static com.academy.allps.entity.QCategory.category;
import static com.academy.allps.entity.QDifficulty.difficulty;
import static com.academy.allps.entity.QPlatform.platform;
import static com.academy.allps.entity.QProblem.problem;
import static com.academy.allps.entity.QProblemCategory.problemCategory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.academy.allps.type.QueryType;
import com.academy.allps.dto.ProblemDto;
import com.academy.allps.dto.RequestDto;
import com.academy.allps.type.CategoryType;
import com.academy.allps.type.DifficultyType;
import com.academy.allps.type.OrderBy;
import com.academy.allps.type.PlatformType;
import com.academy.allps.type.SortCondition;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class ProblemRepositoryCustomImpl implements ProblemRepositoryCustom {
    public static final long PAGE_SIZE = 20;
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ProblemDto> findMatchedProblems(String query, QueryType type, RequestDto requestDto) {

        List<ProblemDto> problems = queryFactory.select(Projections.constructor(ProblemDto.class,
                        problem.id,
                        problem.code,
                        problem.name,
                        problem.url,
                        problem.solvedCount,
                        platform.name,
                        difficulty.name
                ))
                .from(problem)
                .leftJoin(problem.platform, platform)
                .leftJoin(problem.difficulty, difficulty)
                .leftJoin(problemCategory).on(problemCategory.problem.eq(problem))
                .leftJoin(category).on(problemCategory.category.eq(category))
                .where(
                        resolveQuery(query, type),
                        resolvePlatforms(requestDto.getPlatforms()),
                        resolveCategories(requestDto.getCategories()),
                        resolveDifficulties(requestDto.getDifficulties()))
                .groupBy(problem.id)
                .orderBy(resolveOrderBy(requestDto.getSortCondition(), requestDto.getOrderBy()))
                .offset(resolvePage(requestDto.getPage()))
                .limit(PAGE_SIZE)
                .fetch();

        List<Tuple> problemCategories = queryFactory
                .select(problemCategory.problem.id, category.name)
                .from(problemCategory)
                .join(problemCategory.category, category)
                .where(problemCategory.problem.id.in(
                        problems.stream()
                                .map(problemDto -> problemDto.getId())
                                .collect(Collectors.toList())))
                .fetch();

        Map<Long, List<CategoryType>> categoryMap = new HashMap<>();
        problemCategories.forEach(tuple -> {
            Long problemId = tuple.get(problemCategory.problem.id);
            CategoryType categoryType = tuple.get(category.name);
            categoryMap.computeIfAbsent(problemId, k -> new ArrayList<>()).add(categoryType);
        });

        problems.forEach(problemDto -> {
            List<CategoryType> categoryList = categoryMap.getOrDefault(problemDto.getId(), Collections.emptyList());
            problemDto.setCategories(categoryList);
        });

        return problems;
    }

    @Override
    public Long findMatchedProblemCounts(String query, QueryType type, RequestDto requestDto) {
        return queryFactory.select(problem.countDistinct())
                .from(problem)
                .leftJoin(problem.platform, platform)
                .leftJoin(problem.difficulty, difficulty)
                .leftJoin(problemCategory).on(problemCategory.problem.eq(problem))
                .leftJoin(category).on(problemCategory.category.eq(category))
                .where(
                        resolveQuery(query, type),
                        resolvePlatforms(requestDto.getPlatforms()),
                        resolveCategories(requestDto.getCategories()),
                        resolveDifficulties(requestDto.getDifficulties()))
                .fetchOne();
    }

    @Override
    public List<ProblemDto> findMatchedProblemsById(List<Long> problemIds) {
        return queryFactory.select(Projections.constructor(ProblemDto.class,
                problem.id,
                problem.code,
                problem.name,
                problem.url,
                problem.solvedCount,
                platform.name,
                difficulty.name
                ))
                .from(problem)
                .leftJoin(problem.platform, platform)
                .leftJoin(problem.difficulty, difficulty)
                .leftJoin(problemCategory).on(problemCategory.problem.eq(problem))
                .leftJoin(category).on(problemCategory.category.eq(category))
                .where(resolveIds(problemIds))
                .fetch();
    }

    private BooleanExpression resolveQuery(String query, QueryType type) {
        if (ObjectUtils.isEmpty(query)) {
            return null;
        } else if (ObjectUtils.isEmpty(type)) {
            type = QueryType.name;
        }

        if (type.equals(QueryType.code)) {
            return problem.code.like("%" + query + "%");
        }
        return problem.name.like("%" + query + "%");
    }

    private BooleanExpression resolveIds(List<Long> problemIds) {
        if (!ObjectUtils.isEmpty(problemIds)) {
            return problem.id.in(problemIds);
        }
        return null;
    }

    private BooleanExpression resolvePlatforms(List<PlatformType> platforms) {
        if (!ObjectUtils.isEmpty(platforms)) {
            return platform.name.in(platforms);
        }
        return null;
    }

    private BooleanExpression resolveCategories(List<CategoryType> categories) {
        if (!ObjectUtils.isEmpty(categories)) {
            return problemCategory.category.name.in(categories);
        }
        return null;
    }

    private BooleanExpression resolveDifficulties(List<DifficultyType> difficulties) {
        if (!ObjectUtils.isEmpty(difficulties)) {
            return difficulty.name.in(difficulties);
        }
        return null;
    }

    private OrderSpecifier<?> resolveOrderBy(SortCondition sortCondition, OrderBy orderBy) {
        if (ObjectUtils.isEmpty(sortCondition) || ObjectUtils.isEmpty(orderBy)) {
            return problem.id.asc();
        } else if (sortCondition.equals(SortCondition.difficulty) && orderBy.equals(OrderBy.DESC)) {
            return problem.difficulty.id.asc();
        } else if (sortCondition.equals(SortCondition.difficulty) && orderBy.equals(OrderBy.ASC)) {
            return problem.difficulty.id.desc();
        }
        return problem.id.asc();
    }

    private long resolvePage(Long page) {
        return (page - 1) * PAGE_SIZE;
    }
}
