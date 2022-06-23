import Action, { actionTypes } from "../actions/types";

type authState = {
  authLoading: boolean;
  isAuthenticated: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
  };
};

const initialState = {
  authLoading: true,
  isAuthenticated: false,
  user: {
    _id: "",
    name: "",
    email: "",
    password: "",
  },
};

const authReducer = (
  state: authState = initialState,
  action: Action,
): authState => {
  switch (action.type) {
    case actionTypes.AUTH:
      return { ...state, isAuthenticated: action.payload };

    case actionTypes.PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
