import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Header from "components/Header/header";
import FilterSection from "pages/DetailPage/filterSection";
import ProblemsSection from "pages/DetailPage/problemsSection";
import PageSection from "pages/DetailPage/pageSection";

const platforms = ["백준", "프로그래머스", "코드포스", "코드트리", "알고스팟"];
const difficulties = ["브론즈5", "실버5", "골드5", "플래티넘5", "다이아5",
                      "브론즈4", "실버4", "골드4", "플래티넘4", "다이아4",
                      "브론즈3", "실버3", "골드3", "플래티넘3", "다이아3",
                      "브론즈2", "실버2", "골드2", "플래티넘2", "다이아2",
                      "브론즈1", "실버1", "골드1", "플래티넘1", "다이아1"];
const categories = ["DP", "구현", "그리디", "완전탐색", "문자열", 
                    "백트래킹", "그래프탐색", "투포인터", "트리", "우선순위큐", 
                    "자료구조", "최단거리", "누적합", "이진탐색", "전처리", 
                    "수학", "재귀", "분할정복", "정렬", "위상정렬",
                    "해싱", "기하학", "분리집합", "최소신장트리", "세그먼트트리", 
                    "비트마스킹", "유량"];

function DetailPage({ searchTypes }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms.reduce((acc, platform) => ({ ...acc, [platform]: false }), {}));
  const [selectedDifficulties, setSelectedDifficulties] = useState(difficulties.reduce((acc, difficulty) => ({ ...acc, [difficulty]: false }), {}));
  const [selectedCategories, setSelectedCategories] = useState(categories.reduce((acc, category) => ({ ...acc, [category]: false }), {}));
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [problems, setProblems] = useState([]);

  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const location = useLocation();

  const isPageReset = useRef(true);
  const prevLocationSearch = useRef(location.search);

  const resetFilters = () => {
    setSelectedPlatforms(platforms.reduce((acc, platform) => ({ ...acc, [platform]: false }), {}));
    setSelectedDifficulties(difficulties.reduce((acc, difficulty) => ({ ...acc, [difficulty]: false }), {}));
    setSelectedCategories(categories.reduce((acc, category) => ({ ...acc, [category]: false }), {}));
  };
  
  const handleFilterChange = useCallback((filterType, value) => {
    setCurrentPage(1);
    isPageReset.current = true;

    if (filterType === 'platform') {
      setSelectedPlatforms(prevState => ({ ...prevState, [value]: !prevState[value] }));
    } else if (filterType === 'difficulty') {
      setSelectedDifficulties(prevState => ({ ...prevState, [value]: !prevState[value] }));
    } else if (filterType === 'category') {
      setSelectedCategories(prevState => ({ ...prevState, [value]: !prevState[value] }));
    }
  }, []);

  
  const fetchData = useCallback( async () => {
    let query = window.location.search;
    let url = "http://localhost:8080/search" + query;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platforms: Object.keys(selectedPlatforms).filter(platform => selectedPlatforms[platform]),
          difficulties: Object.keys(selectedDifficulties).filter(difficulty => selectedDifficulties[difficulty]),
          categories: Object.keys(selectedCategories).filter(category => selectedCategories[category]),
          page: currentPage,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }, [selectedPlatforms, selectedDifficulties, selectedCategories, currentPage]);


  useEffect(() => {
    if (location.search !== prevLocationSearch.current) {
      resetFilters();
      setCurrentPage(1);
      isPageReset.current = true;
    }

    fetchData().then(data => {
      if (isPageReset.current) {
        setCurrentPage(1);
      } else {
        setCurrentPage(data.page)
      }
      setProblems(data.problems);
      setTotalPages(data.lastPage);
      isPageReset.current = false;
    })

    prevLocationSearch.current = location.search;
  },[fetchData, location.search]);


  return (
    <div className="DetailPage">
      <Header searchTypes={searchTypes} className=""></Header>
      <div className="md:mt-10">
        <FilterSection platforms={platforms} selectedPlatforms={selectedPlatforms} 
            difficulties={difficulties} selectedDifficulties={selectedDifficulties} 
            showDifficulty={showDifficulty} setShowDifficulty={setShowDifficulty} 
            categories={categories} selectedCategories={selectedCategories} 
            showCategories={showCategories} setShowCategories={setShowCategories} 
            onPlatformSelect={(platform) => handleFilterChange('platform', platform)}
            onDifficultySelect={(difficulty) => handleFilterChange('difficulty', difficulty)}
            onCategorySelect={(category) => handleFilterChange('category', category)} 
            className="max-w-[1200px]" />
        <ProblemsSection showDifficulty={showDifficulty} showCategories={showCategories} problems={problems} className="max-w-[1200px]"></ProblemsSection>
        <PageSection totalPages={totalPages} currentPage={currentPage} onPageChange={(i) => setCurrentPage(i)}></PageSection>
      </div>
    </div>
  );
}

export default DetailPage;
