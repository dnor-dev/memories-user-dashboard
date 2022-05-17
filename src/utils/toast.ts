import { actionTypes } from "./../store/actions/types";
import { useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { useDispatch } from "react-redux";

const toast = createStandaloneToast();

const Toast = () => {
  const { title, description, status } = useSelector(
    (state: RootState) => state.alert,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    title !== "" &&
      toast({
        title,
        description,
        status,
        duration: 2000,
        isClosable: true,
        containerStyle: {
          borderRadius: "10px",
          zIndex: 99999999,
        },
        position: "top-right",
      });

    setTimeout(() => {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "",
          description: "",
          status: "info",
        },
      });
    }, 1000);
  }, [title, description, status, dispatch]);
};

export default Toast;
