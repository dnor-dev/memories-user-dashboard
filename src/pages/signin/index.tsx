import React, { useState, useEffect } from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Center,
  Text,
  Button,
  Link as ChakraLink,
  Checkbox,
} from "@chakra-ui/react";
import CustomContainer from "../../components/CustomContainer";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import authActions from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store/reducers";

type InputFields = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _signin } = bindActionCreators(authActions, dispatch);
  const { isAuthenticated, authLoading, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (user._id !== "" && isAuthenticated && !authLoading) {
      navigate("/dashboard");
    }else{
      navigate("/signin")
    }
    // eslint-disable-next-line
  }, [isAuthenticated, authLoading, user]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<InputFields>({ resolver: yupResolver(schema) });

  const callback = () => {
    navigate("/dashboard");
  };

  const signin: SubmitHandler<InputFields> = async (data) => {
    setIsLoading(true);
    await _signin({ ...data, rememberMe: checked }, setIsLoading, callback);
  };

  return (
    <CustomContainer mt={2}>
      <Helmet>
        <title>Memories | Sign In</title>
      </Helmet>
      <Center pt={5}>
        <Text fontSize="4xl" fontWeight="bold">
          Sign in
        </Text>
      </Center>
      <Center py={3}>
        <Text fontSize="2xl">Enter your credentials</Text>
      </Center>

      <Stack justifyContent="center" alignItems="center" mt={4} spacing={4}>
        <FormControl maxW="450px" isInvalid={errors.email ? true : false}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field }) => (
              <Input
                id="email"
                type="email"
                placeholder="Please enter your email address"
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl maxW="450px" isInvalid={errors.password ? true : false}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field }) => (
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter your password"
                  {...field}
                />
                <InputRightElement width="fit-content">
                  <IconButton
                    aria-label="show password"
                    variant="unstyled"
                    icon={
                      <Center>
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </Center>
                    }
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            )}
          />
        </FormControl>

        <FormControl maxW="450px" pt={3}>
          <Checkbox
            isChecked={checked}
            onChange={() => setChecked(!checked)}
            spacing="0.7rem"
          >
            Remember Me
          </Checkbox>
        </FormControl>

        <FormControl maxW="450px" pt={2}>
          <Button
            bgColor="blue.900"
            color="#fff"
            _hover={{
              bgColor: "blue.800",
            }}
            isFullWidth
            isLoading={isLoading}
            loadingText="Signing in..."
            onClick={handleSubmit(signin)}
          >
            Sign in
          </Button>
        </FormControl>

        <Text>
          Don't have an account?{" "}
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
        </Text>
      </Stack>
    </CustomContainer>
  );
};

export default Signin;
