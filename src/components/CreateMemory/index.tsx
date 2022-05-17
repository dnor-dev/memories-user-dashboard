import React, { useState } from "react";
import {
  Stack,
  FormControl,
  Input,
  Center,
  Text,
  Button,
  useColorModeValue,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/actions/post";
import { bindActionCreators } from "redux";

interface IProps {
  title: string;
  message: string;
  Tags: string;
  image: string | ArrayBuffer | null;
}

const CreateMemory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<IProps>({
    title: "",
    message: "",
    Tags: "",
    image: "",
  });
  const dispatch = useDispatch();
  const shadow = useColorModeValue("#aaa", "#000");
  const [clearImage, setClearImage] = useState(1);
  const { _createPosts } = bindActionCreators(postActions, dispatch);

  const clearFields = () => {
    setPostData({
      title: "",
      message: "",
      Tags: "",
      image: "",
    });
    setClearImage(Math.random());
  };

  const callback = () => {
    clearFields();
  };

  const handleClick = async () => {
    if (postData.title === "" || postData.image === "")
      dispatch({
        type: "alert",
        payload: {
          title: "Please fill in the fields",
          status: "warning",
        },
      });
    else {
      setIsLoading(true);
      await _createPosts(postData, setIsLoading, callback);
    }
  };

  const handleClear = () => {
    clearFields();
  };

  const handleImage = (e: any) => {
    if (!e.target.files[0].type.includes("image")) {
      dispatch({
        type: "alert",
        payload: {
          title: "Please select an image file",
          status: "warning",
        },
      });
      e.target.value = null;
    } else {
      let reader = new FileReader();

      reader.readAsDataURL(e.target.files![0]);

      reader.onload = () => {
        setPostData({ ...postData, image: reader.result });
      };
    }
  };

  return (
    <Box boxShadow={`0 0 7px ${shadow}`} borderRadius="10px" padding="1rem">
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          Create a Memory
        </Text>
      </Center>

      <Stack justifyContent="center" alignItems="center" mt={4} spacing={4}>
        <FormControl>
          <Input
            id="title"
            type="text"
            value={postData.title}
            placeholder="Title"
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <Textarea
            id="message"
            value={postData.message}
            placeholder="Message"
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
        </FormControl>

        <FormControl>
          <Input
            id="Tags"
            type="text"
            value={postData.Tags}
            placeholder="Tags (include a comma)"
            onChange={(e) => {
              setPostData({ ...postData, Tags: e.target.value });
            }}
          />
        </FormControl>

        <FormControl>
          <Input
            id="image"
            type="file"
            onChange={handleImage}
            key={clearImage}
          />
        </FormControl>

        <Stack spacing={2} width="100%">
          <FormControl>
            <Button
              bgColor="blue.900"
              color="#fff"
              _hover={{
                bgColor: "blue.800",
              }}
              isFullWidth
              isLoading={isLoading}
              loadingText="Creating..."
              onClick={handleClick}
            >
              Create
            </Button>
          </FormControl>

          <FormControl>
            <Button
              bgColor="red.500"
              color="#fff"
              _hover={{
                bgColor: "red.600",
              }}
              isFullWidth
              onClick={handleClear}
            >
              Clear
            </Button>
          </FormControl>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateMemory;
