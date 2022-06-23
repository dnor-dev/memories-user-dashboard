import Action, { actionTypes } from "../actions/types";

type postState = {
  data: {
    _id: string;
    title: string;
    message: string;
    name: string;
    creator: string;
    tags: string[];
    selectedFile: string;
    likes: string[];
    comments: string[];
    createdAt: string;
  }[];
};

const initialState = {
  data: [
    {
      _id: "",
      title: "",
      message: "",
      name: "",
      creator: "",
      tags: [],
      selectedFile: "",
      likes: [],
      comments: [],
      createdAt: "",
    },
  ],
};

const postReducer = (
  state: postState = initialState,
  action: Action,
): postState => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.GET_POST:
      state.data = [action.payload];
      return state;

    case actionTypes.CREATE_POSTS:
      state.data.push(action.payload);
      return state;

    case actionTypes.COMMENT:
      state.data.map((d) =>
        d._id === action.payload._id ? action.payload : d,
      );
      return state;

    case actionTypes.UPDATE_POSTS:
      state.data.map((d) =>
        d._id === action.payload._id ? action.payload : d,
      );
      return state;

    case actionTypes.SEARCH_POSTS:
      return {
        ...state,
        data: [...action.payload],
      };

    case actionTypes.DELETE_POSTS:
      state.data.filter((post) => post._id !== action.payload.id);
      return state;

    default:
      return state;
  }
};

export default postReducer;
