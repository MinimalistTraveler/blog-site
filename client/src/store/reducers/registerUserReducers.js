const initialState = {
  registerSuccess: false,
  fetching: false,
  error: false,
  fetched: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: true,
        error: false
      };
    }
    case "ADD_USER_FULFILLED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: false,
        registerSuccess: true
      };
    }
    case "ADD_USER_REJECTED": {
      return { ...state, fetched: true, fetching: false, error: true };
    }
    default: {
      return state;
    }
  }
}
