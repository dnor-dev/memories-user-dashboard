import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  mt?: number;
  mb?: number;
};

const CustomContainer = ({ children, mt, mb }: Props) => {
  return (
    <Box paddingX="3.5rem" mt={mt} mb={mb}>
      {children}
    </Box>
  );
};

export default CustomContainer;
