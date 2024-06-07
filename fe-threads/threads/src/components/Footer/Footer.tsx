import {
  Card,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Card p={4} gap={4} borderRadius={8} bg={"#262626"} mt={2}>
      <CardHeader>
        <Heading fontWeight={"medium"} fontSize={15}>
          Developed by Your Name
        </Heading>
      </CardHeader>
      <CardFooter>
        <HStack>
          <Text fontSize={12}>Powered by DumbWays Indonesia</Text>
          <Text fontSize={12}>#1 Coding Bootcamp</Text>
        </HStack>
      </CardFooter>
    </Card>
  );
}
