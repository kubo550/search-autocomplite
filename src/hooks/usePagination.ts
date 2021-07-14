import { useState } from "react";

const getCurrentPage = <T>(data: T[], curIdx: number, limit: number) => {
  console.log(curIdx * limit, limit);

  return [...data].splice(curIdx * limit, limit);
};

const usePagination = <T>(data: T[], limit: number) => {
  const numOfPages = Math.ceil(data.length / limit);

  const [curIdx, setCurIdx] = useState(0);

  const changePage = (idx: number | "next" | "prev" | "first" | "last") => {
    if (typeof idx === "number") {
      setCurIdx(idx);
    } else if (idx === "first") {
      setCurIdx(0);
    } else if (idx === "last") {
      setCurIdx(numOfPages - 1);
    } else if (idx === "next") {
      if (curIdx <= numOfPages - 2) {
        setCurIdx(prev => prev + 1);
      }
    } else if (idx === "prev") {
      if (curIdx >= 1) {
        setCurIdx(prev => prev - 1);
      }
    }
  };

  const currentPage = getCurrentPage(data, curIdx, limit);

  return { currentPage, numOfPages, changePage, curIdx };
};
export default usePagination;
