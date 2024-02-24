// import { useRecoilState } from "recoil";
// import {
//   selectedPlatformsState,
//   showDifficultyState,
//   showCategoriesState,
//   selectedDifficultiesState,
//   selectedCategoriesState,
// } from "pages/RecommendedPage/state";
// import React, { useState, useEffect } from "react";
// import FilterDetailSection from "pages/RecommendedPage/recommendedFilterDetailSection";
// import Toggle from "components/toggle";

// function FilterSection({
//   platforms,
//   difficulties,
//   categories,
//   onPlatformSelect,
//   onDifficultySelect,
//   onCategorySelect,
//   className,
// }) {
//   const [filterDetailView, setFilterDetailView] = useState(false);
//   const [showDifficultyFilter, setShowDifficultyFilter] = useState(true); // 난이도 필터의 표시 상태 추가
//   const [selectedPlatforms, setSelectedPlatforms] = useRecoilState(
//     selectedPlatformsState
//   );
//   const [selectedDifficulties, setSelectedDifficulties] = useRecoilState(
//     selectedDifficultiesState
//   );
//   const [selectedCategories, setSelectedCategories] = useRecoilState(
//     selectedCategoriesState
//   );

//   const [showDifficulty, setShowDifficulty] =
//     useRecoilState(showDifficultyState);
//   const [showCategories, setShowCategories] =
//     useRecoilState(showCategoriesState);

//   const isAllPlatformsSelected =
//     Object.values(selectedPlatforms).every(Boolean);

//   const isAllDifficultiesSelected =
//     Object.values(selectedDifficulties).every(Boolean);

//   const isAllCategoriesSelected =
//     Object.values(selectedCategories).every(Boolean);

//   const toggleAllPlatforms = () => {
//     const newSelectedPlatforms = platforms.reduce((acc, platform) => {
//       return { ...acc, [platform.ko]: !isAllPlatformsSelected };
//     }, {});
//     setSelectedPlatforms(newSelectedPlatforms);
//   };

//   const toggleAllDifficulties = () => {
//     const newSelectedDifficulties = difficulties.reduce((acc, difficulty) => {
//       return { ...acc, [difficulty.ko]: !isAllDifficultiesSelected };
//     }, {});
//     setSelectedDifficulties(newSelectedDifficulties);
//   };
//   const toggleAllCategories = () => {
//     const newSelectedCategories = categories.reduce((acc, category) => {
//       return { ...acc, [category.ko]: !isAllCategoriesSelected };
//     }, {});
//     setSelectedCategories(newSelectedCategories);
//   };

//   // 난이도 정렬 처리 함수 // 다시 짜야함
//   // const handleDifficultySort = () => {
//   //   setIsDifficultySorted(!isDifficultySorted);
//   //   // 추가적으로 필요한 데이터 페치 로직을 여기에 구현하거나, useEffect 내에서 isDifficultySorted 의존성을 감지하여 처리
//   // };

//   return (
//     <div
//       className={`flex flex-col items-center mx-auto rounded-lg ${className}`}
//     >
//       <div className="flex justify-start items-center w-full pt-2 md:pt-0">
//         <button
//           onClick={() => setFilterDetailView(!filterDetailView)}
//           className={`px-4 text-sm md:text-base transition-colors ${
//             filterDetailView
//               ? "border-black text-black"
//               : "border-gray-400 text-gray-400"
//           }`}
//         >
//           검색필터
//         </button>
//         <Toggle
//           name="난이도 보기"
//           state={showDifficulty}
//           setState={setShowDifficulty}
//         ></Toggle>
//         <Toggle
//           name="유형"
//           state={showCategories}
//           setState={setShowCategories}
//         ></Toggle>

//         {/* <Toggle
//           name="난이도 정렬"
//           state={showCategories}
//           setState={setShowCategories}
//         ></Toggle> */}
//       </div>
//       <div
//         className={`w-full text-sm md:text-base transition-max-height ease-in-out duration-500 overflow-y-hidden ${
//           filterDetailView ? "max-h-[600px]" : "pb-2 max-h-0"
//         }`}
//       >
//         {/* 필터링 선택창 */}
//         <div className="flex flex-col w-full px-2 rounded-lg shadow-lg">
//           {/* 플랫폼 선택 창 */}
//           <FilterDetailSection
//             title="플랫폼"
//             options={platforms}
//             selectedOptions={selectedPlatforms}
//             onSelect={onPlatformSelect}
//             onTitleClick={toggleAllPlatforms} // 핸들러 추가
//           />
//           {/* 난이도 선택 창 */}
//           {showDifficultyFilter && ( // 난이도 필터의 표시 여부에 따라 렌더링 제어
//             <FilterDetailSection
//               title="난이도"
//               options={difficulties}
//               selectedOptions={selectedDifficulties}
//               onSelect={onDifficultySelect}
//               onTitleClick={toggleAllDifficulties}
//             />
//           )}
//           {/* 분류 선택 창 */}
//           <FilterDetailSection
//             title="분류"
//             options={categories}
//             selectedOptions={selectedCategories}
//             onSelect={onCategorySelect}
//             onTitleClick={toggleAllCategories}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilterSection;

import React from "react";
import { useRecoilState } from "recoil";
import {
  showDifficultyState,
  showCategoriesState,
} from "pages/RecommendedPage/state";
import Toggle from "components/toggle";

function FilterSection({ className }) {
  const [showDifficulty, setShowDifficulty] =
    useRecoilState(showDifficultyState);
  const [showCategories, setShowCategories] =
    useRecoilState(showCategoriesState);

  return (
    <div
      className={`flex flex-col items-center mx-auto rounded-lg ${className}`}
    >
      <div className="flex justify-start items-center w-full pt-2 md:pt-0">
        {/* 난이도 보기 토글 */}
        <Toggle
          name="난이도 보기"
          state={showDifficulty}
          setState={setShowDifficulty}
        />
        {/* 유형(카테고리) 보기 토글 */}
        <Toggle
          name="유형"
          state={showCategories}
          setState={setShowCategories}
        />
      </div>
    </div>
  );
}

export default FilterSection;
