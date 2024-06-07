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
import Foryou from "../Suggested/Foryou";
import Footer from "../Footer/Footer";
import { useUser } from "../../features/threads/hooks/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <Box m={2}>
      <Card gap={4} borderRadius={8} bg={"#252927"} mb={2}>
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
                right={"-9px"}
                w={"290px"}
                h={"80px"}
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
              <Button
                position={"absolute"}
                left={"180px"}
                border={"1px solid #fff"}
                borderRadius={20}
                height={"10px"}
                p={4}
                colorScheme="white"
                fontSize={"10px"}
                alignSelf={"end"}
                justifySelf={"end"}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
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
                <Text fontSize={12} mb={2}>
                  {user?.user?.profile_description}
                </Text>

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
      <Foryou />
      <Footer />
    </Box>
  );
}
