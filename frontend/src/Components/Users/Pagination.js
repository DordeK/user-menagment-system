import React from 'react'

export default function Pagination({changePage, currentPage}) {
  const paginationNumbers = [
    currentPage-3,
    currentPage-2,
    currentPage-1,
    currentPage,
    currentPage+1,
    currentPage+2,
    currentPage+3
  ]
  return (
    <div className="pagginationBox">
      {paginationNumbers.map(num => <button key={num} className="pagginationNum" onClick={() => changePage(num)}>{num}</button>)}
    </div>
  )
}
