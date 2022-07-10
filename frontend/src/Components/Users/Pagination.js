import React from "react";

export default function Pagination({ changePage, currentPage }) {
  let paginationNumbers;

  if (currentPage === 0) {
    paginationNumbers = [
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
      currentPage + 5,
      currentPage + 6,
    ];
  } else if (currentPage === 1) {
    paginationNumbers = [
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
      currentPage + 5,
    ];
  } else if (currentPage === 2) {
    paginationNumbers = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
      currentPage + 4,
    ];
  } else {
    paginationNumbers = [
      currentPage - 3,
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
    ];
  }

  return (
    <div className="pagginationBox">
      {paginationNumbers.map((num) => (
        <button
          key={num}
          className={
            currentPage === num
              ? "pagginationNum currentPage"
              : "pagginationNum"
          }
          onClick={() => changePage(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
