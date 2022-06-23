import React from "react";
import { Stack, Text, Image } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="400px" mt={3}>
      <Image src="/images/not-found.svg" height="50%" width="40%" />
      <Text pt={4} fontWeight="bold" fontSize="32px">
        Oops, Page not found
      </Text>
      <Text fontSize="12px">Sorry, but the requested page is not found</Text>
    </Stack>
  );
};

export default NotFound;
