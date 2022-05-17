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
  currentPage: any;
  numberOfPages: any;
  total: any;
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
  currentPage: null,
  numberOfPages: null,
  total: null,
};

const postReducer = (
  state: postState = initialState,
  action: Action,
): postState => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return action.payload;

    case actionTypes.CREATE_POSTS:
      state.data.push(action.payload);
      return state;

    case actionTypes.DELETE_POSTS:
      state.data.filter((post) => post._id !== action.payload.id);
      return state;

    default:
      return state;
  }
};

export default postReducer;
