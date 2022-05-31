import React, { useState } from "react";
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
} from "@chakra-ui/react";
import CustomContainer from "../../components/CustomContainer";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router";

type InputFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
  })
  .required();

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _signup } = bindActionCreators(authActions, dispatch);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) });

  const callback = () => {
    navigate("/dashboard");
  };

  const signup: SubmitHandler<InputFields> = async (data) => {
    setIsLoading(true);
    await _signup(data, setIsLoading, callback);
  };

  return (
    <CustomContainer mt={2}>
      <Helmet>
        <title>Memories | Sign Up</title>
      </Helmet>
      <Center pt={5}>
        <Text fontSize="4xl" fontWeight="bold">
          Get Started
        </Text>
      </Center>
      <Center py={3}>
        <Text fontSize="2xl">Create a new account</Text>
      </Center>

      <Stack justifyContent="center" alignItems="center" mt={4} spacing={6}>
        <FormControl
          maxW="450px"
          isRequired
          isInvalid={errors.firstName ? true : false}
        >
          <FormLabel htmlFor="fname">First name</FormLabel>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field }) => (
              <Input
                id="fname"
                type="text"
                placeholder="Please enter your firstname"
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl
          maxW="450px"
          isRequired
          isInvalid={errors.lastName ? true : false}
        >
          <FormLabel htmlFor="lname">Last name</FormLabel>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field }) => (
              <Input
                id="lname"
                type="text"
                placeholder="Please enter your lastname"
                {...field}
              />
            )}
          />
        </FormControl>

        <FormControl
          maxW="450px"
          isRequired
          isInvalid={errors.email ? true : false}
        >
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

        <FormControl
          maxW="450px"
          isRequired
          isInvalid={errors.password ? true : false}
        >
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

        <FormControl
          maxW="450px"
          isRequired
          isInvalid={errors.confirmPassword ? true : false}
        >
          <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            defaultValue={""}
            render={({ field }) => (
              <InputGroup>
                <Input
                  id="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Please confirm your password"
                  {...field}
                />
                <InputRightElement width="fit-content">
                  <IconButton
                    aria-label="show confirmpassword"
                    variant="unstyled"
                    icon={
                      <Center>
                        {showConfirmPassword ? (
                          <MdVisibilityOff />
                        ) : (
                          <MdVisibility />
                        )}
                      </Center>
                    }
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            )}
          />
        </FormControl>

        <FormControl maxW="450px" pt={3}>
          <Button
            isLoading={isLoading}
            loadingText="Please wait..."
            bgColor="blue.900"
            color="#fff"
            _hover={{
              bgColor: "blue.800",
            }}
            isFullWidth
            onClick={handleSubmit(signup)}
          >
            Sign up
          </Button>
        </FormControl>

        <Text>
          Have an account already?{" "}
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
        </Text>
      </Stack>
    </CustomContainer>
  );
};

export default Signup;
