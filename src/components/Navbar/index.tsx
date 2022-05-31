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
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { IoIosArrowDown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const text = useColorModeValue("#fff", "gray.800");
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

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
                <Text>Good evening, {user.name.split(" ")[0]}</Text>
                <Avatar name={user.name} />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<Icon as={IoIosArrowDown} />}
                    variant="ghost"
                  />
                  <MenuList>
                    <MenuItem icon={<Icon as={FiLogOut} />}>Logout</MenuItem>
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
