import React, { useEffect, useCallback, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  //selectedPlatformsState,
  //selectedDifficultiesState,
  //selectedCategoriesState,
  totalPagesState,
  currentPageState,
  problemsState,
  showDifficultyState,
  showCategoriesState,
} from "pages/RecommendedPage/state";
import Header from "pages/RecommendedPage/header";
import FilterSection from "pages/RecommendedPage/recommendedFilterSection";
import ProblemsSection from "pages/RecommendedPage/recommendedProblemsSection";
import PageSection from "pages/RecommendedPage/recommendedPageSection";
import { useLocation } from "react-router-dom";
import Toggle from "components/toggle";
// import {
//   platforms,
//   difficulties,
//   categories,
// } from "pages/RecommendedPage/state";

//필터 부분 없어도 됨
function RecommendedPage({ searchTypes }) {
  //recoil 상태 관리 라이브러리를 사용하여 selectedPlatforms 상태를 관리
  //selectedPlatforms: 현재 선택된 플랫폼의 목록을 나타내는 상태 변수입니다. 이 변수를 통해 컴포넌트는 어떤 플랫폼이 선택되었는지 알 수 있습니다.
  //setSelectedPlatforms: 이 함수를 통해 selectedPlatforms 상태를 업데이트할 수 있습니다. 새로운 플랫폼을 선택하거나 현재 선택을 변경할 때 이 함수를 호출합니다.
  //useRecoilState(selectedPlatformsState): selectedPlatformsState는 Recoil의 atom으로 정의된 전역 상태입니다. 이 상태는 애플리케이션의 어느 곳에서나 접근하고 업데이트할 수 있습니다.
  //useRecoilState 훅은 이 atom 상태에 대한 접근과 업데이트 기능을 제공합니다.

  // const [selectedPlatforms, setSelectedPlatforms] = useRecoilState(
  //   selectedPlatformsState
  // );
  // const [selectedDifficulties, setSelectedDifficulties] = useRecoilState(
  //   selectedDifficultiesState
  // );
  // const [selectedCategories, setSelectedCategories] = useRecoilState(
  //   selectedCategoriesState
  // );

  // const [sortDifficulty, setSortDifficulty] =
  //   useRecoilState(sortDifficultyState); // 추가: 난이도 정렬 상태 관리

  const [totalPages, setTotalPages] = useRecoilState(totalPagesState); //페이지
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState); //페이지
  const [problems, setProblems] = useRecoilState(problemsState);
  const [showDifficulty, setShowDifficulty] =
    useRecoilState(showDifficultyState);
  const [showCategories, setShowCategories] =
    useRecoilState(showCategoriesState);

  const location = useLocation();
  const isPageReset = useRef(true);
  const prevLocationSearch = useRef(location.search);

  // 필터 초기화 함수
  // const resetFilters = () => {
  //   setSelectedPlatforms(
  //     platforms.reduce(
  //       (acc, platform) => ({ ...acc, [platform.ko]: false }),
  //       {}
  //     )
  //   );
  //   setSelectedDifficulties(
  //     difficulties.reduce(
  //       (acc, difficulty) => ({ ...acc, [difficulty.ko]: false }),
  //       {}
  //     )
  //   );
  //   setSelectedCategories(
  //     categories.reduce(
  //       (acc, category) => ({ ...acc, [category.ko]: false }),
  //       {}
  //     )
  //   );
  // };

  // 필터 변경 핸들러
  // const handleFilterChange = useCallback((filterType, value) => {
  //   setCurrentPage(1);
  //   isPageReset.current = true;

  //   if (filterType === "platform") {
  //     setSelectedPlatforms((prev) => ({ ...prev, [value]: !prev[value] }));
  //   } else if (filterType === "difficulty") {
  //     setSelectedDifficulties((prev) => ({ ...prev, [value]: !prev[value] }));
  //   } else if (filterType === "category") {
  //     setSelectedCategories((prev) => ({ ...prev, [value]: !prev[value] }));
  //   }
  // }, []);

  // 데이터 페치 부분 추천문제에 따라 변경 필요 밑의 코드는 기존 코드임
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //더미데이터 확인용
  // const fetchData = useCallback(async () => {
  //   // 더미 데이터
  //   const dummyData = {
  //     page: 4,
  //     lastPage: 20,
  //     problems: [
  //       {
  //         code: "1000",
  //         name: "A+B",
  //         url: "https://www.acmicpc.net/problem/1000",
  //         difficulty: "Bronze5",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "1001",
  //         name: "A-B",
  //         url: "https://www.acmicpc.net/problem/1001",
  //         difficulty: "Bronze5",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //       {
  //         code: "2873",
  //         name: "롤러코스터",
  //         url: "https://www.acmicpc.net/problem/2873",
  //         difficulty: "Platinum2",
  //         platform: "baekjoon",
  //         categories: ["수학", "구현"],
  //       },
  //     ],
  //   };

  //   // 여기에서는 실제 비동기 요청 대신 더미 데이터를 직접 반환
  //   return dummyData;
  // }, []);

  const fetchData = useCallback(async () => {
    // location.search를 사용하여 쿼리 파라미터를 직접 URL에 포함
    let query = window.location.search;
    let baseUrl = "http://localhost:3001/recommended"; // 변경 필요 : 실제 서버 주소로
    let url = `${baseUrl}${query}`; // 쿼리 파라미터를 포함한 전체 URL

    // let query = window.location.search; // URL 쿼리스트링 사용
    // let url = " " + query;
    //실제 요청할 서버 주소로 변경해야함

    try {
      const response = await fetch(url, {
        method: "GET", //데이터 가져오기
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
      // setProblems(data.problems);
      // setTotalPages(data.lastPage);
      // setCurrentPage(data.page);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, [currentPage]);

  // URL 변경 시 데이터 페치
  useEffect(() => {
    if (location.search !== prevLocationSearch.current) {
      setCurrentPage(1);
      isPageReset.current = true;
    }

    fetchData().then((data) => {
      if (data) {
        setProblems(data.problems);
        setTotalPages(data.lastPage);
        if (isPageReset.current) {
          setCurrentPage(1);
        } else {
          setCurrentPage(data.page);
        }
      }
      isPageReset.current = false;
    });

    prevLocationSearch.current = location.search;
  }, [fetchData, location.search]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="recommendedPage">
      <Header searchTypes={searchTypes} />
      <div className="md:mt-10">
        {/* 난이도 및 유형 토글 */}
        <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto px-4 mb-4">
          <Toggle
            name="난이도 보기"
            state={showDifficulty}
            setState={setShowDifficulty}
          />
          <div className="ml-auto mr-12">
            {" "}
            {/* 유형 보기 토글을 오른쪽으로 조정 */}
            <Toggle
              name="유형 보기"
              state={showCategories}
              setState={setShowCategories}
            />
          </div>
        </div>
        <ProblemsSection
          showDifficulty={showDifficulty}
          showCategories={showCategories}
          problems={problems}
          className="max-w-[1200px]"
        />
        <PageSection
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default RecommendedPage;
