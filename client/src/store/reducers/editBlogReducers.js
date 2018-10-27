const initalState = {
  fetched: false,
  fetching: false,
  error: false,
  editSuccess: false
};

export default function editBlogReducers(state = initalState, action) {
  switch (action.type) {
    case "EDIT_BLOG_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: false,
        error: false,
        editSuccess: false
      };
    }
    case "EDIT_BLOG_FULFILLED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: false,
        editSuccess: true
      };
    }
    case "EDIT_BLOG_REJECTED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: true,
        editSuccess: false
      };
    }
    default: {
      return state;
    }
  }
}
