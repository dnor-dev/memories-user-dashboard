import {
  Box,
  Stack,
  Text,
  FormControl,
  InputGroup,
  Input,
  Button,
  InputRightElement,
  Grid,
  GridItem,
  Progress,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import BufferAuth from "../../components/BufferAuth";
import CustomContainer from "../../components/CustomContainer";
import Card from "../../components/Card";
import CreateMemory from "../../components/CreateMemory";
import * as postActions from "../../store/actions/post";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const Dashboard = () => {
  const { user, authLoading } = useSelector((state: RootState) => state.auth);
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { _getPosts } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    _getPosts();
    // eslint-disable-next-line
  }, [posts]);

  return (
    <>
      {loading && (
        <Box position="sticky" top={95} zIndex={999999999}>
          <Progress size="xs" isIndeterminate />
        </Box>
      )}
      <Helmet>
        <title>Dashboard | {user?.name}</title>
      </Helmet>
      <CustomContainer mt={6}>
        <BufferAuth />
        {user.name !== "" && !authLoading && (
          <Stack alignItems="center" spacing={5}>
            <Text fontSize="2xl" fontWeight="bold">
              Our Memories
            </Text>
            <FormControl maxW="700px">
              <InputGroup mb={5}>
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Search for memories or tags"
                />
                <InputRightElement width="fit-content">
                  <Button
                    bgColor="blue.900"
                    color="#fff"
                    _hover={{
                      bgColor: "blue.800",
                    }}
                  >
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack alignItems="top" direction="row" spacing={5}>
              <Grid templateColumns="repeat(3, 1fr)" gap={3} flex={2.5}>
                {posts.data.length !== 0 &&
                  posts.data.map((post, index) => (
                    <GridItem key={index}>
                      <Card {...post} setLoading={setLoading} />
                    </GridItem>
                  ))}
              </Grid>
              <Box flex={1}>
                <CreateMemory />
              </Box>
            </Stack>
          </Stack>
        )}
      </CustomContainer>
    </>
  );
};

export default Dashboard;
