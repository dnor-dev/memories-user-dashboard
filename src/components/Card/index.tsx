import {
  Box,
  Stack,
  Text,
  Tag,
  TagLabel,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { truncate } from "lodash";
import moment from "moment";
import * as postActions from "../../store/actions/post";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

type Props = {
  _id: string;
  title: string;
  message: string;
  name: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  setLoading: (x: boolean) => void;
};

const Card = ({
  _id,
  title,
  message,
  name,
  creator,
  tags,
  selectedFile,
  likes,
  comments,
  createdAt,
  setLoading,
}: Props) => {
  const shadow = useColorModeValue("#aaa", "#000");
  const likesColor = useColorModeValue("blue.900", "#fff");
  const dispatch = useDispatch();

  const { _deletePosts } = bindActionCreators(postActions, dispatch);

  return (
    <Stack>
      <Box borderRadius="10px" boxShadow={`0 0 7px ${shadow}`}>
        <Box
          bg={`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${selectedFile})`}
          borderTopRadius="inherit"
          bgPosition="center"
          bgSize="cover"
          height="150px"
          padding="1rem"
        >
          <Box color="#fff">
            <Text>{creator}</Text>
            <Text fontSize="x-small">{moment(createdAt).fromNow()}</Text>
          </Box>
        </Box>
        <Box padding="1rem">
          <HStack>
            {tags.length !== 0 &&
              tags.map((tag, i) => (
                <Tag variant="outline" key={i}>
                  <TagLabel fontSize="x-small">{`#${tag}`}</TagLabel>
                </Tag>
              ))}
          </HStack>
          <Text mt={3} mb={1}>
            {title}
          </Text>
          <Text fontSize="small">{truncate(message, { length: 30 })}</Text>
          <Stack
            mt={4}
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <HStack
              spacing={1}
              alignItems="center"
              color={likesColor}
              cursor="pointer"
              width="fit-content"
            >
              <Icon as={AiOutlineLike} />
              <Text fontSize="x-small">
                {likes.length} {likes.length !== 1 ? "Likes" : "Like"}
              </Text>
            </HStack>

            <Icon
              as={AiFillDelete}
              cursor="pointer"
              onClick={() => {
                setLoading(true);
                _deletePosts(_id, setLoading);
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Card;
