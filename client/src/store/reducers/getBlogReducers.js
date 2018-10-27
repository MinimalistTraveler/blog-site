const initialState = {
  fetched: false,
  fetching: false,
  getBlogSuccess: true,
  blog: {},
  error: false,
  logout: false
};

export default function blogReducers(state = initialState, action) {
  switch (action.type) {
    case "GET_BLOG_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: true,
        getBlogSuccess: false,
        error: false,
        notFound: null,
        logout: false
      };
    }
    case "GET_BLOG_FULFILLED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        getBlogSuccess: true,
        blog: action.payload.data,
        error: false,
        logout: false,
        notFound: false
      };
    }
    case "GET_BLOG_REJECTED": {
      if (String(action.payload).includes("404")) {
        return {
          ...state,
          fetched: true,
          fetching: false,
          getBlogSuccess: false,
          error: true,
          notFound: true
        };
      }
      if (String(action.payload).includes("401")) {
        return {
          ...state,
          fetched: true,
          fetching: false,
          getBlogSuccess: false,
          error: true,
          notFound: false,
          logout: true
        };
      }
      return {
        ...state,
        fetched: true,
        fetching: false,
        getBlogSuccess: false,
        error: true,
        logout: false,
        notFound: false
      };
    }
    default: {
      return state;
    }
  }
}
