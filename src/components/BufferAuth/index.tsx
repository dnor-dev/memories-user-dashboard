import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { useNavigate } from "react-router";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import { actionTypes } from "../../store/actions/types";

const BufferAuth = () => {
  const { isAuthenticated, authLoading, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spinner = useColorModeValue("gray.800", "#fff");

  useEffect(() => {
    if (!authLoading && user._id === "" && !isAuthenticated) {
      dispatch({
        type: actionTypes.ALERT,
        payload: {
          title: "Unauthenticated",
          status: "error",
          description: "Please login",
        },
      });
      navigate("/signin");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, authLoading, user]);

  return (
    <>
      {authLoading && (
        <Box
          position="absolute"
          top="250%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="-999999999"
        >
          <Spinner size="xl" color={spinner} />
        </Box>
      )}
    </>
  );
};

export default BufferAuth;
