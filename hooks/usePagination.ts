import { useReducer, useEffect } from "react";

type State = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  canNextPage: boolean;
  canPrevPage: boolean;
};

type ActionTypes =
  | { type: "INIT_STATE"; initialPageSize: number; totalElements: number }
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "CHANGE_PAGE_SIZE"; newPageSize: number; totalElements: number };

const initialState: State = {
  pageIndex: 0,
  pageSize: 0,
  pageCount: 0,
  canNextPage: false,
  canPrevPage: false,
};

const reducer = (state: State, action: ActionTypes) => {
  let newPageIndex;

  switch (action.type) {
    case "INIT_STATE":
      return {
        pageIndex: 0,
        pageSize: action.initialPageSize,
        pageCount: Math.ceil(action.totalElements / action.initialPageSize),
        canNextPage: action.totalElements > action.initialPageSize,
        canPrevPage: false,
      };
    case "PREV_PAGE":
      newPageIndex = state.pageIndex - 1;

      if (!state.canPrevPage) {
        return state;
      }

      return {
        ...state,
        pageIndex: newPageIndex,
        canNextPage: newPageIndex + 1 < state.pageCount,
        canPrevPage: newPageIndex > 0,
      };
    case "NEXT_PAGE":
      newPageIndex = state.pageIndex + 1;

      if (!state.canNextPage) {
        return state;
      }

      return {
        ...state,
        pageIndex: newPageIndex,
        canNextPage: newPageIndex + 1 < state.pageCount,
        canPrevPage: newPageIndex > 0,
      };
    case "CHANGE_PAGE_SIZE":
      newPageIndex = Math.floor(
        (state.pageIndex * state.pageSize) / action.newPageSize
      );
      const newPageCount = Math.ceil(action.totalElements / action.newPageSize);

      return {
        ...state,
        pageSize: action.newPageSize,
        pageCount: newPageCount,
        pageIndex: newPageIndex,
        canNextPage: newPageIndex + 1 < newPageCount,
        canPrevPage: newPageIndex > 0,
      };
    default:
      return state;
  }
};

type HookParameters = {
  totalElements: number;
  initialPageSize?: number;
};

const usePagination = ({
  totalElements,
  initialPageSize = 10,
}: HookParameters) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "INIT_STATE",
      initialPageSize: initialPageSize,
      totalElements: totalElements,
    });
  }, [totalElements, initialPageSize]);

  const setPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  const setNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const changePageSize = (newPageSize: number) => {
    dispatch({
      type: "CHANGE_PAGE_SIZE",
      newPageSize,
      totalElements,
    });
  };

  return {
    pagination: {
      ...state,
      currentPage: state.pageIndex + 1,
      elementIndexStart: state.pageSize * state.pageIndex,
      elementIndexEnd: state.pageSize * (state.pageIndex + 1),
    },
    setPrevPage,
    setNextPage,
    changePageSize,
  };
};

export default usePagination;
