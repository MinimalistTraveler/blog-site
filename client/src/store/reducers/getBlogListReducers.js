const initalState = {
  fetched: false,
  fetching: false,
  blogList: [],
  error: false,
  noBlogs: false
};

export default function getBlogListReducers(state = initalState, action) {
  switch (action.type) {
    case "GET_BLOG_LIST_PENDING": {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: false,
        noBlogs: false
      };
    }
    case "GET_BLOG_LIST_REJECTED": {
      if (String(action.payload).includes("404")) {
        return {
          ...state,
          error: true,
          fetching: false,
          fetched: true,
          noBlogs: true
        };
      }
      return {
        ...state,
        error: true,
        fetching: false,
        fetched: true,
        noBlogs: false
      };
    }
    case "GET_BLOG_LIST_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        blogList: action.payload.data,
        error: false,
        noBlogs: false
      };
    }
    default: {
      return state;
    }
  }
}
