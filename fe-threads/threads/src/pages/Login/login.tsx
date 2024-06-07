import React from "react";
import {
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../features/threads/hooks/useLogin";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { handleChange, handleLogin } = useLogin();

  const navigate = useNavigate();

  const handleCreateAcc = () => {
    navigate("/auth/register");
  };

  return (
    <Box
      width={"1280px"}
      h={"100dvh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card maxW="400px" borderWidth="1px" borderRadius="lg" p={5}>
        <CardHeader>
          <Heading
            textAlign={"center"}
            fontSize={40}
            fontWeight={"medium"}
            color={"green.300"}
          >
            circle
          </Heading>
          <Heading textAlign={"center"} mb={4}>
            Login to Cicle
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl id="email">
            <Input
              width="350px"
              borderRadius={4}
              height={"30px"}
              placeholder="Your email"
              name="email"
              color={"blackAlpha.700"}
              fontSize={12}
              isRequired
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <InputGroup>
              <Input
                height={"30px"}
                borderRadius={4}
                type={show ? "text" : "password"}
                placeholder="Your password"
                name="password"
                width="350px"
                color={"blackAlpha.700"}
                fontSize={12}
                isRequired
                onChange={handleChange}
              />
              <InputRightElement>
                <Button
                  height={"30px"}
                  size="sm"
                  bg={"gray.600"}
                  p={2}
                  borderRadius={4}
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </CardBody>
        <CardFooter>
          <VStack m={"0 auto"}>
            <Button
              colorScheme="blue"
              width="350px"
              mt={4}
              bg={"#2e7841"}
              borderRadius={4}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button onClick={handleCreateAcc}>
              <Box display={"flex"}>
                <Text fontWeight={"light"} fontSize={12}>
                  Don't you already have account?
                </Text>
                <Text fontSize={12} fontWeight={"medium"} color={"#2e7841"}>
                  Create an account?
                </Text>
              </Box>
            </Button>
          </VStack>
        </CardFooter>
      </Card>
    </Box>
  );
}
