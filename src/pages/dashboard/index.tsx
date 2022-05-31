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
import { useNavigate } from "react-router";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const { user, authLoading } = useSelector((state: RootState) => state.auth);
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const getCalls = async () => {
    await _getPosts(page);
    setLoading(false);
  };

  useEffect(() => {
    if (searchText !== "") {
      posts.data.filter((post) => {
        return (
          post.message.includes(searchText.trim()) ||
          post.title.includes(searchText.trim()) ||
          post.tags.includes(searchText.trim())
        );
      });
    } else if (page) {
      getCalls();
    }
    // eslint-disable-next-line
  }, [posts]);

  const { _getPosts, _searchPosts } = bindActionCreators(postActions, dispatch);

  const callback = () => {
    navigate(
      `/dashboard/search?searchQuery=${searchText || "none"}&tags=${
        searchText || "none"
      }`,
    );
  };
  const postSearch = () => {
    if (searchText === "") {
      dispatch({
        type: "alert",
        payload: {
          title: "Please fill the search field",
          status: "warning",
        },
      });
    } else {
      setLoading(true);
      _searchPosts(
        {
          searchQuery: searchText.trim(),
          tags: searchText.trim(),
        },
        setLoading,
        callback,
      );
    }
  };

  const handleSearch = async () => {
    await postSearch();
  };

  const handleKeyPress = async (e: any) => {
    if (e.keyCode === 13) {
      await postSearch();
    }
  };

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
                  value={searchText}
                  placeholder="Search for memories or tags"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <InputRightElement width="fit-content">
                  <Button
                    bgColor="blue.900"
                    color="#fff"
                    _hover={{
                      bgColor: "blue.800",
                    }}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack alignItems="top" direction="row" spacing={5}>
              {posts.data.length !== 0 && (
                <Stack alignItems="center">
                  <Grid templateColumns="repeat(3, 1fr)" gap={3} maxW="900px">
                    {posts.data.map((post) => (
                      <GridItem key={post._id}>
                        <Card
                          {...post}
                          setLoading={setLoading}
                          setPostId={setPostId}
                        />
                      </GridItem>
                    ))}
                  </Grid>
                  <Box pt={5}>
                    <Pagination
                      page={page}
                      setPage={setPage}
                      totalPages={posts.numberOfPages}
                      setLoading={setLoading}
                      searchText={searchText}
                    />
                  </Box>
                </Stack>
              )}
              <Box>
                <CreateMemory postId={postId} setPostId={setPostId} />
              </Box>
            </Stack>
          </Stack>
        )}
      </CustomContainer>
    </>
  );
};

export default Dashboard;
