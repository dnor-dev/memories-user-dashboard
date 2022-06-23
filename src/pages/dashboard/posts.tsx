import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  Box,
  Stack,
  Text,
  Image,
  Spinner,
  useColorModeValue,
  Tag,
  TagLabel,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { bindActionCreators } from "redux";
import * as postActions from "../../store/actions/post";
import BufferAuth from "../../components/BufferAuth";
import { Helmet } from "react-helmet";
import CustomContainer from "../../components/CustomContainer";
import moment from "moment";
import Comments from "../../components/Comments";

const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { _getPost } = bindActionCreators(postActions, dispatch);

  useEffect(() => {
    _getPost(id);
    // eslint-disable-next-line
  }, [id]);

  const { posts } = useSelector((state: RootState) => state);
  const { comments, message, selectedFile, title, tags, creator, createdAt } =
    posts.data[0];

  const spinner = useColorModeValue("gray.800", "#fff");
  const shadow = useColorModeValue("#aaa", "#000");

  return posts.data[0]._id !== "" && posts.data[0]._id === id ? (
    <>
      <Helmet>
        <title>Post | {title && title}</title>
      </Helmet>
      <BufferAuth />
      <CustomContainer>
        <Box
          mt={6}
          boxShadow={`0 0 7px ${shadow}`}
          borderRadius="10px"
          padding="1rem"
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack p={3} w="60%">
              <Text fontSize="3xl">{title}</Text>
              <Box>
                <HStack flexWrap="wrap" spacing={1.5}>
                  {tags.length !== 0 &&
                    tags.map((tag, i) => (
                      <Tag variant="outline" key={i}>
                        <TagLabel fontSize="x-small">{`#${tag}`}</TagLabel>
                      </Tag>
                    ))}
                </HStack>
                <Text mt={3}>{message}</Text>
                <br />
                <Text>Posted by : {creator}</Text>
                <Text fontSize="x-small">{moment(createdAt).fromNow()}</Text>
              </Box>
              <br />
              <Divider />
              <Comments id={id} comments={comments} />
            </Stack>
            <Image
              boxShadow={`0 0 7px ${shadow}`}
              borderRadius="10px"
              boxSize="150px"
              src={selectedFile}
              objectFit="cover"
              objectPosition="center"
              height="xs"
              width="40%"
              alt={title}
            />
          </Stack>
          <Divider />
        </Box>
      </CustomContainer>
    </>
  ) : (
    <Box
      position="absolute"
      top="250%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="-999999999"
    >
      <Spinner size="xl" color={spinner} />
    </Box>
  );
};
export default Posts;
