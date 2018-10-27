const initalState = {
  deleteBlogSuccess: false,
  fetched: false,
  fetching: false,
  error: false
};

export default function deleteBlogReducers(state = initalState, action) {
  switch (action.type) {
    case "DELETE_BLOG_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: false
      };
    }
    case "DELETE_BLOG_FULFILLED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: false,
        deleteBlogSuccess: true
      };
    }
    case "DELETE_BLOG_REJECTED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: true,
        deleteBlogSuccess: false
      };
    }
    default: {
      return {
        state
      };
    }
  }
}
