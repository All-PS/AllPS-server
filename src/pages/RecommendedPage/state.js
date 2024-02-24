// state.js // 추천문제페이지에 있는 필터에 쓰임
import { atom } from "recoil";
export const platforms = [
  { en: "baekjoon", ko: "백준" },
  { en: "programmers", ko: "프로그래머스" },
  { en: "codeforces", ko: "코드포스" },
];
export const difficulties = [
  { en: "bronze5", ko: "브론즈5" },
  { en: "silver5", ko: "실버5" },
  { en: "gold5", ko: "골드5" },
  { en: "platinum5", ko: "플래티넘5" },
  { en: "diamond5", ko: "다이아5" },
  { en: "bronze4", ko: "브론즈4" },
  { en: "silver4", ko: "실버4" },
  { en: "gold4", ko: "골드4" },
  { en: "platinum4", ko: "플래티넘4" },
  { en: "diamond4", ko: "다이아4" },
  { en: "bronze3", ko: "브론즈3" },
  { en: "silver3", ko: "실버3" },
  { en: "gold3", ko: "골드3" },
  { en: "platinum3", ko: "플래티넘3" },
  { en: "diamond3", ko: "다이아3" },
  { en: "bronze2", ko: "브론즈2" },
  { en: "silver2", ko: "실버2" },
  { en: "gold2", ko: "골드2" },
  { en: "platinum2", ko: "플래티넘2" },
  { en: "diamond2", ko: "다이아2" },
  { en: "bronze1", ko: "브론즈1" },
  { en: "silver1", ko: "실버1" },
  { en: "gold1", ko: "골드1" },
  { en: "platinum1", ko: "플래티넘1" },
  { en: "diamond1", ko: "다이아1" },
];
export const categories = [
  { en: "dp", ko: "DP" },
  { en: "implementation", ko: "구현" },
  { en: "greedy", ko: "그리디" },
  { en: "bruteforcing", ko: "완전탐색" },
  { en: "string", ko: "문자열" },
  { en: "backtracking", ko: "백트래킹" },
  { en: "graph", ko: "그래프탐색" },
  { en: "two_pointer", ko: "투포인터" },
  { en: "tree", ko: "트리" },
  { en: "priority_queue", ko: "우선순위큐" },
  { en: "data_structure", ko: "자료구조" },
  { en: "shortest_path", ko: "최단거리" },
  { en: "prefix_sum", ko: "누적합" },
  { en: "binary_search", ko: "이진탐색" },
  { en: "precomputation", ko: "전처리" },
  { en: "math", ko: "수학" },
  { en: "recursion", ko: "재귀" },
  { en: "divide_and_conquer", ko: "분할정복" },
  { en: "sorting", ko: "정렬" },
  { en: "topological_sorting", ko: "위상정렬" },
  { en: "hashing", ko: "해싱" },
  { en: "geometry", ko: "기하학" },
  { en: "disjoint_set", ko: "분리집합" },
  { en: "mst", ko: "최소신장트리" },
  { en: "segment_tree", ko: "세그먼트트리" },
  { en: "bitmasking", ko: "비트마스킹" },
  { en: "flow", ko: "유량" },
];

export const selectedPlatformsState = atom({
  key: "selectedPlatformsState",
  default: platforms.reduce(
    (acc, platform) => ({ ...acc, [platform]: false }),
    {}
  ),
});

export const selectedDifficultiesState = atom({
  key: "selectedDifficultiesState",
  default: difficulties.reduce(
    (acc, difficulty) => ({ ...acc, [difficulty]: false }),
    {}
  ),
});

export const selectedCategoriesState = atom({
  key: "selectedCategoriesState",
  default: categories.reduce(
    (acc, category) => ({ ...acc, [category]: false }),
    {}
  ),
});

export const selectedRatingsState = atom({
  key: "selectedRatingsState",
  default: categories.reduce(
    (acc, category) => ({ ...acc, [category]: false }),
    {}
  ),
});

export const totalPagesState = atom({
  key: "totalPagesState",
  default: 1,
});

export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

export const problemsState = atom({
  key: "problemsState",
  default: [],
});

export const showDifficultyState = atom({
  key: "showDifficultyState",
  default: false,
});

export const showCategoriesState = atom({
  key: "showCategoriesState",
  default: false,
});

// 추천문제 안에서 난이도 정렬에 필요한 부분
export const sortDifficultyState = atom({
  key: "sortDifficultyState",
  default: false, // 기본적으로 난이도 정렬은 비활성화
});
