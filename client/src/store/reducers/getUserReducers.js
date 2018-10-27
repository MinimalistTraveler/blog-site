const initialState = {
  getUserSuccess: false,
  fetching: false,
  error: false,
  fetched: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_FULFILLED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        getUserSuccess: true,
        user: action.payload.data,
        error: false
      };
    }
    case "GET_USER_PENDING": {
      return {
        ...state,
        fetched: false,
        fetching: true,
        getUserSuccess: false,
        error: false
      };
    }
    case "GET_USER_REJECTED": {
      localStorage.removeItem("token");
      return {
        ...state,
        fetched: true,
        fetching: false,
        getUserSuccess: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};
