export enum actionTypes {
  ALERT = "alert",
  AUTH = "auth",
  PROFILE = "profile",
  AUTH_LOADING = "auth_loading",
  GET_POSTS = "get_posts",
  CREATE_POSTS = "create_posts",
  DELETE_POSTS = "delete_posts",
  UPDATE_POSTS = "update_posts",
  LIKE_POSTS = "like_posts",
  SEARCH_POSTS = "search_posts",
}

interface alertAction {
  type: actionTypes.ALERT;
  payload: {
    title: string;
    description?: string;
    status: "info" | "warning" | "success" | "error";
  };
}

interface Auth {
  type: actionTypes.AUTH;
  payload: boolean;
}

interface AuthLoading {
  type: actionTypes.AUTH_LOADING;
  payload: boolean;
}

interface Profile {
  type: actionTypes.PROFILE;
  payload: any;
}

interface GetPosts {
  type: actionTypes.GET_POSTS;
  payload: {
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
}

interface CreatePosts {
  type: actionTypes.CREATE_POSTS;
  payload: {
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
  };
}

interface UpdatePosts {
  type: actionTypes.UPDATE_POSTS;
  payload: {
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
  };
}

interface DeletePosts {
  type: actionTypes.DELETE_POSTS;
  payload: {
    id: string;
  };
}

interface LikePosts {
  type: actionTypes.LIKE_POSTS;
}

interface SearchPosts {
  type: actionTypes.SEARCH_POSTS;
  payload: {
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
}

type Action =
  | alertAction
  | Auth
  | Profile
  | AuthLoading
  | GetPosts
  | CreatePosts
  | UpdatePosts
  | DeletePosts
  | LikePosts
  | SearchPosts;

export default Action;
