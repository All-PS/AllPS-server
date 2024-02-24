import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "pages/RecommendedPage/header";

function CodePlatformInputForm() {
  const [code, setCode] = useState("");
  const [platformId, setPlatformId] = useState("");
  const [searchTypes, setSearchTypes] = useState(""); // searchTypes를 관리하기 위한 상태 추가
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ code, platformId });
    navigate(`/recommended?code=${code}&platformId=${platformId}`);
  };

  return (
    <div className="recommendedPage">
      <Header searchTypes={searchTypes} />
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-lg rounded-lg p-8"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                문제번호(code)
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="platformId"
                className="block text-sm font-medium text-gray-700"
              >
                플랫폼 ID
              </label>
              <input
                type="text"
                id="platformId"
                name="platformId"
                value={platformId}
                onChange={(e) => setPlatformId(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            >
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CodePlatformInputForm;
