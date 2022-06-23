import React, { ReactNode, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import Toast from "../../utils/toast";
import Navbar from "../Navbar";
import Footer from "../Footer";
import authActions from "../../store/actions/auth";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { _getProfile } = bindActionCreators(authActions, dispatch);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const initialCalls = async () => {
    await _getProfile();
  };

  useEffect(() => {
    initialCalls();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  Toast();
  return (
    <>
      <Stack justifyContent="space-between" height="100vh">
        <Box as="main" position="relative">
          <ColorModeSwitcher
            position="fixed"
            zIndex={9999999}
            right={5}
            bottom={5}
          />
          <Navbar />
          {children}
        </Box>

        <Box as="footer">
          <Footer />
        </Box>
      </Stack>
    </>
  );
};

export default Layout;
