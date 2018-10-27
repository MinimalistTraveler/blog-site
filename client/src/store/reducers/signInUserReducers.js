const initialState = {
  signInSuccess: false,
  fetching: false,
  error: false,
  fetched: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER_PENDING": {
      return { ...state, fetched: false, fetching: true, error: false };
    }
    case "LOGIN_USER_FULFILLED": {
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: false,
        signInSuccess: true
      };
    }
    case "AUTO_LOGIN": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        error: false,
        signInSuccess: true
      };
    }
    case "SIGN_OUT": {
      console.log("Signout");
      localStorage.removeItem("token");
      return {
        ...state,
        fetched: false,
        fetching: false,
        error: false,
        signInSuccess: false
      };
    }
    case "LOGIN_USER_REJECTED": {
      console.log(action.payload);
      return { ...state, fetched: true, fetching: false, error: true };
    }
    default: {
      return state;
    }
  }
}
