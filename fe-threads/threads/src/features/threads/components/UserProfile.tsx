import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  CardFooter,
  Heading,
  Stack,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";

export default function UserProfile() {
  const { user } = useUser();

  return (
    <Box m={2}>
      <Card gap={4} borderRadius={8} bg={"#252927"} mb={2} w={"xl"}>
        <CardHeader my={2} marginLeft={4}>
          <Heading fontWeight={"medium"}>My Profile</Heading>
        </CardHeader>
        <CardBody mb={1}>
          <Box>
            <Box borderRadius={"20px"} m={2}>
              <Image
                display={"flex"}
                borderRadius={"10px"}
                position={"relative"}
                w={"540px"}
                h={"80px"}
                right={"-8px"}
                src={user?.user?.profile_picture}
              />
            </Box>

            <Box
              display={"flex"}
              flexDirection={"row"}
              position={"absolute"}
              top={"110px"}
              right={"-30px"}
              width={"full"}
            >
              <Avatar
                h={"70px"}
                w={"70px"}
                src={user?.user?.profile_picture}
                border={"5px solid #262626"}
                bg={"#262626"}
              />
            </Box>
          </Box>
        </CardBody>
        <CardFooter p={4}>
          <Stack>
            <Heading fontWeight={"medium"} fontSize={"20px"}>
              {user?.user?.full_name}
            </Heading>
            <Text fontSize={12}>@{user?.user?.username}</Text>
            {user?.user?.profile_description ? (
              <Box>
                <Text fontSize={12}>{user?.user?.profile_description}</Text>

                <HStack>
                  <Text fontSize={12}>
                    {user?.user?.following?.length} Following
                  </Text>
                  <Text fontSize={12}>
                    {user?.user?.followers?.length} Followers
                  </Text>
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack>
                  <Text fontSize={12}>
                    {user?.user?.following?.length} Following
                  </Text>
                  <Text fontSize={12}>
                    {user?.user?.followers?.length} Followers
                  </Text>
                </HStack>
              </Box>
            )}
          </Stack>
        </CardFooter>
      </Card>
    </Box>
  );
}
