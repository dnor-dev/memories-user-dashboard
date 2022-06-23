import { Dispatch } from "react";
import Action, { actionTypes } from "./types";
import AuthService from "../../utils/api/auth.api";
import Cookies from "universal-cookie";

const _signin =
  (
    data: { email: string; password: string; rememberMe: boolean },
    setIsLoading: (x: boolean) => void,
    callback: () => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    const cookies = new Cookies();
    const { email, password, rememberMe } = data;
    try {
      const res = await AuthService.signin({ email, password });
      if (rememberMe) {
        sessionStorage.removeItem("memories_app");
        cookies.set("memories_app", res.data.token);
      } else {
        cookies.remove("memories_app");
        sessionStorage.setItem("memories_app", res.data.token);
      }

      dispatch({
        type: actionTypes.AUTH,
        payload: true,
      });

      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "Logged In",
          status: "success",
          description: "Please wait...",
        },
      });

      setIsLoading && setIsLoading(false);
      callback();
    } catch (error: any) {
      setIsLoading && setIsLoading(false);
      cookies.remove("memories_app");
      sessionStorage.removeItem("memories_app");
      dispatch({
        type: actionTypes.AUTH,
        payload: false,
      });

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

const _signup =
  (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    setIsLoading: (x: boolean) => void,
    callback: () => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    const cookies = new Cookies();
    try {
      const res = await AuthService.signup(data);
      cookies.remove("memories_app");
      sessionStorage.setItem("memories_app", res.data.token);

      dispatch({
        type: actionTypes.AUTH,
        payload: true,
      });

      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "Welcome",
          status: "success",
          description: "Please wait...",
        },
      });

      setIsLoading && setIsLoading(false);
      callback();
    } catch (error: any) {
      setIsLoading && setIsLoading(false);
      sessionStorage.removeItem("memories_app");
      dispatch({
        type: actionTypes.AUTH,
        payload: false,
      });

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

const _getProfile = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: actionTypes.AUTH_LOADING,
    payload: true,
  });
  const cookies = new Cookies();
  try {
    const res = await AuthService.getProfile();
    dispatch({
      type: actionTypes.PROFILE,
      payload: res.data,
    });
    dispatch({
      type: actionTypes.AUTH_LOADING,
      payload: false,
    });
  } catch (error) {
    cookies.remove("memories_app");
    sessionStorage.removeItem("memories_app");
  }
};

const _logout = (callback: () => void) => (dispatch: Dispatch<Action>) => {
  sessionStorage.removeItem("memories_app");
  const cookies = new Cookies();
  cookies.remove("memories_app");
  dispatch({
    type: actionTypes.PROFILE,
    payload: {
      _id: "",
      name: "",
      email: "",
      password: "",
    },
  });
  callback();
};

const authActions = { _signin, _signup, _getProfile, _logout };

export default authActions;
