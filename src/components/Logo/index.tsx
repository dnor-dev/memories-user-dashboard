import React from "react";
import { Stack, Heading } from "@chakra-ui/react";
import { MdMemory } from "react-icons/md";
import { Icon } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Stack spacing={0.4} direction="row" alignItems="center">
      <Icon as={MdMemory} w={10} h={10} color="blue.900" />
      <Heading fontFamily="'Koulen', cursive" color="blue.900" pt={1.5}>
        Memories
      </Heading>
    </Stack>
  );
};

export default Logo;
