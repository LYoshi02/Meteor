import { useReducer } from "react";

import fetchJson from "../utils/fetchJson";

type ErrorObj = { message: string; status: number };

type State = {
  loading: boolean;
  success: boolean;
  error: null | ErrorObj;
};

type ActionTypes =
  | { type: "init" }
  | { type: "success" }
  | { type: "error"; error: ErrorObj };

const initialState: State = {
  loading: false,
  success: false,
  error: null,
};

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case "init":
      return { loading: true, error: null, success: false };
    case "success":
      return { loading: false, error: null, success: true };
    case "error":
      return { loading: false, error: action.error, success: false };
    default:
      return initialState;
  }
};

const useHttp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendRequest = async <T = unknown>(
    requestConfig: { input: RequestInfo; init?: RequestInit },
    applyData?: (res: T) => void
  ) => {
    try {
      dispatch({ type: "init" });
      const data = await fetchJson<T>(requestConfig.input, requestConfig.init);

      if (applyData) {
        applyData(data);
      }

      dispatch({ type: "success" });
    } catch (error: any) {
      const errorMessage =
        error.data.message || error.message || "Se produjo un error";

      dispatch({
        type: "error",
        error: {
          message: errorMessage,
          status: error.response.status,
        },
      });
    }
  };

  return {
    isLoading: state.loading,
    error: state.error,
    sendRequest,
    success: state.success,
  };
};

export default useHttp;
