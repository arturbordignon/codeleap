import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { createPost, deletePost as apiDelete, listByPage, patchPost } from "../lib/api";

const PostsContext = createContext(null);

const initial = {
  items: [],
  count: 0,
  limit: 10,
  page: 1,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS": {
      const { payload, page } = action;
      const items = payload.results
        .slice()
        .sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime));
      return {
        ...state,
        loading: false,
        error: null,
        items,
        count: Number(payload.count ?? 0),
        page: page ?? state.page,
      };
    }

    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

export function PostsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const goToPage = useCallback(
    async (pageNum) => {
      dispatch({ type: "LOAD_START" });
      const controller = new AbortController();
      try {
        const data = await listByPage(pageNum, state.limit, controller.signal);
        dispatch({ type: "LOAD_SUCCESS", payload: data, page: pageNum });
      } catch (err) {
        dispatch({ type: "LOAD_ERROR", error: err.message || String(err) });
      }
      return () => controller.abort();
    },
    [state.limit]
  );

  useEffect(() => {
    goToPage(1);
  }, [goToPage]);

  const create = useCallback(
    async (payload) => {
      const c = new AbortController();
      await createPost(payload, c.signal);
      await goToPage(1);
    },
    [goToPage]
  );

  const update = useCallback(
    async (id, payload) => {
      const c = new AbortController();
      await patchPost(id, payload, c.signal);
      await goToPage(state.page);
    },
    [goToPage, state.page]
  );

  const remove = useCallback(
    async (id) => {
      const c = new AbortController();
      await apiDelete(id, c.signal);

      const newCount = Math.max(0, state.count - 1);
      const lastPageAfter = Math.max(1, Math.ceil(newCount / state.limit));
      const targetPage = Math.min(state.page, lastPageAfter);

      await goToPage(targetPage);
    },
    [apiDelete, goToPage, state.count, state.limit, state.page]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      count: state.count,
      limit: state.limit,
      page: state.page,
      loading: state.loading,
      error: state.error,
      goToPage,
      create,
      update,
      remove,
    }),
    [state, goToPage, create, update, remove]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within PostsProvider");
  }
  return context;
}
