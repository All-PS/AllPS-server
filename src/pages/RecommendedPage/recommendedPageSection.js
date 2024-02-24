import React from "react";

function PageSection({ totalPages, currentPage, onPageChange }) {
  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(currentPage + 2, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (v, k) => k + startPage
  );

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex">
        <li
          className={`${
            currentPage === 1 || totalPages === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
        >
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || totalPages === 0}
            className="px-2 py-1"
          >
            처음
          </button>
        </li>
        <li
          className={`${
            currentPage === 1 || totalPages === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
        >
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1 || totalPages === 0}
            className="px-2 py-1"
          >
            이전
          </button>
        </li>
        {pages.map((page) => (
          <li
            className={`${
              page === currentPage ? "text-white bg-black" : "text-black"
            } cursor-pointer`}
            key={page}
          >
            <button onClick={() => onPageChange(page)} className="px-2 py-1">
              {page}
            </button>
          </li>
        ))}
        <li
          className={`${
            currentPage === totalPages || totalPages === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
        >
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2 py-1"
          >
            다음
          </button>
        </li>
        <li
          className={`${
            currentPage === totalPages || totalPages === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-black cursor-pointer"
          }`}
        >
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2 py-1"
          >
            마지막
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default PageSection;
