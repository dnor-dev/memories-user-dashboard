import React from "react";
import {
  Stack,
  Box,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CustomContainer from "../CustomContainer";
import Logo from "../Logo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { FiLogOut } from "react-icons/fi";
import authActions from "../../store/actions/auth";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const text = useColorModeValue("#fff", "gray.800");
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _logout } = bindActionCreators(authActions, dispatch);

  const date = new Date();

  const greeting =
    date.getHours() < 12
      ? "Good morning"
      : date.getHours() >= 12 && date.getHours() < 17
      ? "Good afternoon"
      : "Good evening";

  const callback = () => {
    navigate("/signin");
  };
  const handleClick = () => {
    _logout(callback);
  };

  return (
    <Box
      paddingY="1.5rem"
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={9}
      bgColor={text}
    >
      <CustomContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Logo />
          </Box>
          <Stack alignItems="center">
            {isAuthenticated && user.name !== "" ? (
              <HStack spacing={5}>
                <Text>
                  {greeting}, {user.name.split(" ")[0]}
                </Text>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<Avatar name={user.name} />}
                    variant="ghost"
                    _focus={{
                      outline: "none",
                    }}
                  />
                  <MenuList>
                    <MenuItem
                      icon={<Icon as={FiLogOut} />}
                      onClick={handleClick}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            ) : (
              <HStack spacing={3}>
                {/* <Link to="/signin"> */}
                <ChakraLink
                  as={Link}
                  _hover={{
                    textDecoration: "none",
                    color: "blue.700",
                    transition: "all ease-in-out 300ms",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  to="/signin"
                >
                  Sign In
                </ChakraLink>
                {/* </Link> */}
                <ChakraLink
                  as={Link}
                  _hover={{
                    textDecoration: "none",
                    color: "blue.700",
                    transition: "all ease-in-out 300ms",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  to="/signup"
                >
                  Sign Up
                </ChakraLink>
              </HStack>
            )}
          </Stack>
        </Stack>
      </CustomContainer>
    </Box>
  );
};

export default Navbar;
