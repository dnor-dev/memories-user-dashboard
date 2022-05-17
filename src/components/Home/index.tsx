import React, { useEffect } from "react";
import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Center,
  Button,
} from "@chakra-ui/react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Center>
          <VStack spacing={8}>
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
            <Button
              bgColor="blue.200"
              onClick={() => {
                console.log(location.pathname);
              }}
            >
              Click
            </Button>
          </VStack>
        </Center>
      </Grid>
    </Box>
  );
};

export default Home;
