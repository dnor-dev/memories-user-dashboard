import React, { useState, useRef } from "react";
import {
  Stack,
  Box,
  Text,
  FormControl,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/actions/post";
import { RootState } from "../../store/reducers";

type Props = {
  id: string;
  comments: string[];
};

const Comments = ({ id, comments }: Props) => {
  const [postComment, setPostComment] = useState("");
  const [postComments, setPostComments] = useState<any>(comments);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { _comment } = bindActionCreators(postActions, dispatch);
  const { user } = useSelector((state: RootState) => state.auth);

  const commentsRef = useRef<any>();

  const handleClick = async () => {
    if (postComment.trim() !== "") {
      setLoading(true);
      const commentArrays = await _comment(
        id,
        `${user.name}:${postComment}`,
        setLoading,
      );
      setPostComments(commentArrays);
      commentsRef.current.scrollIntoView({ behaviour: "smooth" });
      setPostComment("");
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" py={5}>
      <Box w="46%">
        <Text mb={2}>Comments</Text>
        <Box height="200px" overflowY="scroll">
          {postComments.length !== 0 ? (
            postComments.map((c: any, index: any) => (
              <Box key={index} my={3}>
                <Text fontSize="15px" fontWeight="bold">
                  {c.split(":")[0]}
                </Text>
                <Text fontSize="12px">{c.split(":")[1]}</Text>
              </Box>
            ))
          ) : (
            <Text fontSize="14px">No comments yet</Text>
          )}
          <div ref={commentsRef} />
        </Box>
      </Box>
      <Stack spacing={2} w="50%">
        <Text fontSize="14px">Post a comment</Text>
        <FormControl>
          <Textarea
            fontSize="14px"
            id="comment"
            value={postComment}
            placeholder="Write a comment"
            onChange={(e: any) => setPostComment(e.target.value)}
          />
          <Stack alignItems="flex-end">
            <Button
              fontSize="14px"
              mt={4}
              bgColor="blue.900"
              color="#fff"
              _hover={{
                bgColor: "blue.800",
              }}
              isLoading={loading}
              loadingText={"Please wait..."}
              onClick={handleClick}
            >
              Comment
            </Button>
          </Stack>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default Comments;
