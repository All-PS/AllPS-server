package com.academy.allps.repository;

import static com.academy.allps.domain.QCategory.category;
import static com.academy.allps.domain.QDifficulty.difficulty;
import static com.academy.allps.domain.QPlatform.platform;
import static com.academy.allps.domain.QProblem.problem;
import static com.academy.allps.domain.QProblemCategory.problemCategory;

import com.academy.allps.dto.ProblemDto;
import com.academy.allps.dto.ProblemSearchCondition;
import com.querydsl.core.types.OrderSpecifier;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class ProblemRepositoryCustomImpl implements ProblemRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ProblemDto> searchProblems(ProblemSearchCondition searchCondition) {

        List<ProblemDto> problems = getProblems(searchCondition);
        return problems;
    }

    @Override
    public Long searchProblemCount(ProblemSearchCondition searchCondition) {

        Long count = getCount(searchCondition);
        return count;
    }

    private List<ProblemDto> getProblems(ProblemSearchCondition searchCondition) {
        List<ProblemDto> problems = queryFactory.select(Projections.constructor(ProblemDto.class,
                        problem.id,
                        problem.code,
                        problem.name,
                        problem.url,
                        difficulty.name,
                        platform.name
                ))
                .from(problem)
                .leftJoin(problem.problemCategories, problemCategory)
                .leftJoin(problemCategory.category, category)
                .innerJoin(problem.difficulty, difficulty)
                .innerJoin(problem.platform, platform)
                .where(
                        searchQuery(searchCondition),
                        searchPlatforms(searchCondition),
                        searchCategories(searchCondition),
                        searchDifficulty(searchCondition)
                )
                .orderBy(sort(searchCondition))
                .groupBy(problem.id)
                .offset((searchCondition.getPage() - 1) * 20)
                .limit(20)
                .fetch();

        problems.forEach(problemDto -> {
            List<String> categories = queryFactory
                    .select(category.name)
                    .from(problemCategory)
                    .innerJoin(problemCategory.category, category)
                    .where(problemCategory.problem.id.eq(problemDto.getId()))
                    .fetch();

            problemDto.setCategories(categories);
        });
        return problems;
    }

    private Long getCount(ProblemSearchCondition searchCondition) {
        Long count = queryFactory
                .select(problem.countDistinct())
                .from(problem)
                .leftJoin(problem.problemCategories, problemCategory)
                .leftJoin(problemCategory.category, category)
                .innerJoin(problem.difficulty, difficulty)
                .innerJoin(problem.platform, platform)
                .where(
                        searchQuery(searchCondition),
                        searchPlatforms(searchCondition),
                        searchCategories(searchCondition),
                        searchDifficulty(searchCondition)
                )
                .fetchOne();
        return count;
    }

    private BooleanExpression searchQuery(ProblemSearchCondition searchCondition) {
        if (searchCondition.getSearchQuery() == null || searchCondition.getSearchQuery().isEmpty()) {
            return null;
        }

        if (searchCondition.getSearchType().equals("code")) {
            return problem.code.like("%" + searchCondition.getSearchQuery() + "%");
        }

        return problem.name.like("%" + searchCondition.getSearchQuery() + "%");
    }

    private BooleanExpression searchPlatforms(ProblemSearchCondition searchCondition) {
        if (searchCondition.getPlatforms() == null || searchCondition.getPlatforms().isEmpty()) {
            return null;
        }
        return platform.name.in(searchCondition.getPlatforms());
    }

    private BooleanExpression searchCategories(ProblemSearchCondition searchCondition) {
        if (searchCondition.getCategories() == null || searchCondition.getCategories().isEmpty()) {
            return null;
        }
        return problemCategory.category.name.in(searchCondition.getCategories());
    }

    private BooleanExpression searchDifficulty(ProblemSearchCondition searchCondition) {
        if (searchCondition.getDifficulties() == null || searchCondition.getDifficulties().isEmpty()) {
            return null;
        }
        return difficulty.name.in(searchCondition.getDifficulties());
    }

    private OrderSpecifier<?> sort(ProblemSearchCondition searchCondition) {
        if (searchCondition.getSortCondition() == null || searchCondition.getSortCondition().isEmpty()) {
            return problem.id.asc();
        }

        String sortCondition = searchCondition.getSortCondition();
        String orderBy = searchCondition.getOrderBy();

        if (sortCondition.equals("difficulty") && orderBy.equals("ASC")) {
            return problem.difficulty.id.asc();
        } else if (sortCondition.equals("difficulty") && orderBy.equals("DESC")) {
            return problem.difficulty.id.desc();
        } else {
            return problem.id.asc();
        }
    }
}
