import {
  Box,
  Stack,
  Text,
  Tag,
  TagLabel,
  HStack,
  Icon,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { truncate } from "lodash";
import moment from "moment";
import * as postActions from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { RootState } from "../../store/reducers";
import { Link } from "react-router-dom";

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
  setPostId: (x: any) => void;
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
  setPostId,
}: Props) => {
  const shadow = useColorModeValue("#aaa", "#000");
  const likesColor = useColorModeValue("blue.900", "#fff");
  const spinner = useColorModeValue("gray.800", "#fff");

  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const { _deletePosts, _likePosts } = bindActionCreators(
    postActions,
    dispatch,
  );

  const [postLikes, setPostLikes] = useState(likes);
  const hasLiked = likes.find((like) => like === user._id);
  const handleLikes = (id: string) => {
    _likePosts(id);
    if (hasLiked) {
      setPostLikes(likes.filter((id) => id !== user._id));
    } else {
      setPostLikes([...likes, user._id]);
    }
  };

  return (
    <Stack minW="280px">
      {_id !== "" ? (
        <Box borderRadius="10px" boxShadow={`0 0 7px ${shadow}`}>
          <Box
            bg={`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${selectedFile})`}
            borderTopRadius="inherit"
            bgPosition="center"
            bgSize="cover"
            height="150px"
            padding="1rem"
          >
            <Stack
              direction="row"
              alignItems="top"
              justifyContent="space-between"
            >
              <Box color="#fff">
                <Text>{creator}</Text>
                <Text fontSize="x-small">{moment(createdAt).fromNow()}</Text>
              </Box>
              {user.name === creator && (
                <Icon
                  as={MdEdit}
                  cursor="pointer"
                  color="#fff"
                  boxSize="0.9em"
                  onClick={() => setPostId(_id)}
                />
              )}
            </Stack>
          </Box>
          <Box padding="1rem">
            <HStack flexWrap="wrap" spacing={1}>
              {tags.length !== 0 &&
                tags.map((tag, i) => (
                  <Tag variant="outline" key={i}>
                    <TagLabel fontSize="x-small">{`#${tag}`}</TagLabel>
                  </Tag>
                ))}
            </HStack>
            <Link to={`posts/${_id}`}>
              <Text mt={3} mb={1}>
                {title}
              </Text>
            </Link>
            <Link to={`posts/${_id}`}>
              <Text fontSize="small">{truncate(message, { length: 30 })}</Text>
            </Link>
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
                <Icon
                  as={hasLiked ? AiFillLike : AiOutlineLike}
                  onClick={() => handleLikes(_id)}
                />
                <Text fontSize="x-small">
                  {hasLiked && postLikes.length === 1
                    ? `You liked this post`
                    : hasLiked && postLikes.length === 2
                    ? `You and ${postLikes.length - 1} other liked this`
                    : hasLiked && postLikes.length > 2
                    ? `You and ${postLikes.length - 1} others liked this`
                    : `${postLikes.length} Likes`}
                </Text>
              </HStack>

              {user.name === creator && (
                <Icon
                  as={AiFillDelete}
                  cursor="pointer"
                  onClick={() => {
                    setLoading(true);
                    _deletePosts(_id, setLoading);
                  }}
                />
              )}
            </Stack>
          </Box>
        </Box>
      ) : (
        <Center>
          <Spinner size="xl" alignSelf="center" color={spinner} />
        </Center>
      )}
    </Stack>
  );
};

export default Card;
