const initalState = {
  fetched: false,
  fetching: false,
  error: false,
  notLoggedIn: false,
  addSuccess: false
};

export default function addBlog(state = initalState, action) {
  switch (action.type) {
    case "ADD_BLOG_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: false,
        addSuccess: false
      };
    }
    case "ADD_BLOG_FULFILLED": {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: false,
        addSuccess: true
      };
    }
    case "ADD_BLOG_REJECTED": {
      console.log(action.payload);
      if (String(action.payload).includes("401")) {
        console.log(action.payload);
        return {
          ...state,
          notLoggedIn: true,
          error: true,
          fetched: true,
          fetching: false,
          addSuccess: false
        };
      }
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: true,
        addSuccess: false
      };
    }
    default: {
      return state;
    }
  }
}
