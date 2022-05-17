import Action, { actionTypes } from "./types";
import { Dispatch } from "react";
import PostService from "../../utils/api/post.api";
import CloudinaryApiService from "../../utils/api/media.api";

export const _getPosts = () => async (dispatch: Dispatch<Action>) => {
  try {
    const res = await PostService.getPosts();
    dispatch({
      type: actionTypes.GET_POSTS,
      payload: res.data,
    });
  } catch (error) {}
};

export const _createPosts =
  (
    data: {
      title: string;
      message: string;
      Tags: string;
      image: string | ArrayBuffer | null;
    },
    setIsLoading: (x: boolean) => void,
    callback: () => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    const { title, message, Tags, image } = data;
    try {
      const imageRes = await CloudinaryApiService.uploadImage(image);
      let selectedFile = imageRes.data.secure_url;
      const res = await PostService.createPosts({
        title,
        message,
        tags: Tags.split(","),
        selectedFile,
      });
      dispatch({
        type: actionTypes.CREATE_POSTS,
        payload: res.data,
      });

      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "Post created successfully",
          status: "success",
        },
      });

      setIsLoading && setIsLoading(false);
      callback();
    } catch (error: any) {
      setIsLoading && setIsLoading(false);
      if (error?.message === "Network Error") {
        dispatch({
          type: actionTypes.ALERT,
          payload: {
            title: "You are offline",
            status: "warning",
          },
        });
      } else if (error?.response?.data?.message) {
        dispatch({
          type: actionTypes.ALERT,
          payload: {
            title: error.response.data.message,
            status: "error",
          },
        });
      } else {
        dispatch({
          type: actionTypes.ALERT,
          payload: {
            title: "Something went wrong",
            status: "error",
            description: "Please try again.",
          },
        });
      }
    }
  };

export const _deletePosts =
  (id: string, setLoading: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      await PostService.deletePosts(id);
      dispatch({
        type: actionTypes.DELETE_POSTS,
        payload: {
          id,
        },
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "Post deleted",
          status: "success",
        },
      });
      setLoading && setLoading(false);
    } catch (error: any) {
      setLoading && setLoading(false);
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "You are offline",
          status: "warning",
        },
      });
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "Something went wrong",
          status: "error",
          description: "Please try again.",
        },
      });
    }
  };
