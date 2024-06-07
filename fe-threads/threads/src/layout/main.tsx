import React from "react";
import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import Profile from "../components/MyProfile/Profile";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Box width="full" h={"full"} m={"0 auto"}>
      <Flex gap={4}>
        <Box
          // w={"300px"}
          w={{
            base: "300px", // 0-48em
            md: "50%", // 48em-80em,
            xl: "25%", // 80em+
          }}
          minH="100vh"
          left={"0"}
          borderRight={"1px solid #fff"}
          marginLeft={2}
        >
          <Navbar />
        </Box>

        {children}

        <Box
          marginLeft={2}
          w={"350px"}
          right={"0"}
          position={"fixed"}
          h={"full"}
          borderLeft={"1px solid #fff"}
        >
          <Profile />
        </Box>
      </Flex>
    </Box>
  );
}
