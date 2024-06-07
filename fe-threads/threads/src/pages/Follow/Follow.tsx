import {
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Heading,
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  CardFooter,
  Button,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Api } from "../../libs/axios-threads";
import { useUser } from "../../features/threads/hooks/useUser";
import { TUser } from "../../types/UserType";
import { TFollow } from "../../types/FollowType";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../store/RootReducer";

export default function Follow() {
  const [selectedTab, setSelectedTab] = useState(null);
  const { user, allUser, isLoadingUser } = useUser();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleTabClick = (index: any) => {
    setSelectedTab(index === selectedTab ? null : index);
  };

  const { mutate: handleFollow } = useMutation({
    mutationFn: (followId: number) => {
      return Api.post("/follow", { followingId: followId });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      const response = await Api.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));
    },
    onError: (err) => {
      console.log(err, "failed to follow");
    },
  });

  function handleClickFollow(followId: number) {
    if (followId !== undefined) {
      handleFollow(followId);
    }
  }

  return (
    <Box w={"550px"}>
      <Box gap={4}>
        <Heading fontSize={20} fontWeight={"medium"} p={4}>
          Follows
        </Heading>
        <Tabs isFitted variant="soft-rounded" color="white">
          <TabList borderBottom={"1px solid #fff"} m={2}>
            <Tab
              justifySelf={"center"}
              w="275px"
              borderRadius={"6px"}
              _hover={{
                backgroundColor: "gray.700",
                color: "green.200",
              }}
              onClick={() => handleTabClick(0)}
              _selected={{
                bg: selectedTab === 0 ? "green.400" : "green.400",
                color: "white",
              }}
            >
              Followers
            </Tab>
            <Tab
              w="275px"
              borderRadius={"6px"}
              _hover={{
                backgroundColor: "gray.700",
                color: "green.200",
              }}
              onClick={() => handleTabClick(1)}
              _selected={{
                bg: selectedTab === 1 ? "green.400" : "none",
                color: "white",
              }}
            >
              Following
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isLoadingUser ? (
                <Spinner size="xl" />
              ) : (
                <>
                  {user?.user?.followers?.map((data: TFollow) => (
                    <Card
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                      mt={2}
                    >
                      <Avatar
                        objectFit="cover"
                        alignSelf={"center"}
                        ml={2}
                        mr={2}
                        h={"50px"}
                        w={"50px"}
                        src={data?.profile_picture}
                      />

                      <Stack w={"400px"}>
                        <CardBody>
                          <Text
                            className="fullname"
                            fontSize={"12px"}
                            p={"1px"}
                          >
                            {data?.full_name}
                          </Text>

                          <Text
                            className="username"
                            fontSize={"12px"}
                            p={"1px"}
                          >
                            @{data?.username}
                          </Text>

                          <Text
                            className="username"
                            fontSize={"12px"}
                            p={"1px"}
                          >
                            {data?.profile_description}
                          </Text>
                        </CardBody>
                      </Stack>
                      {!user?.user?.following
                        ?.map((follow: TFollow) => follow?.id)
                        .includes(data.id) ? (
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          w={"120px"}
                        >
                          <Button
                            justifyContent={"center"}
                            borderRadius={"10px"}
                            border={"1px solid #fff"}
                            fontSize={"12px"}
                            p={4}
                            h={"20px"}
                            alignSelf={"center"}
                            onClick={() => handleClickFollow(data?.id)}
                          >
                            Follow
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          w={"120px"}
                        >
                          <Button
                            justifyContent={"center"}
                            borderRadius={"10px"}
                            border={"1px solid #fff"}
                            fontSize={"12px"}
                            p={4}
                            h={"20px"}
                            alignSelf={"center"}
                            onClick={() => handleClickFollow(data?.id)}
                          >
                            Unfollow
                          </Button>
                        </Box>
                      )}
                    </Card>
                  ))}
                </>
              )}
            </TabPanel>

            <TabPanel>
              {isLoadingUser ? (
                <Spinner size="xl" />
              ) : (
                <>
                  {user.user?.following?.map((following: TFollow) => (
                    <Card
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                      mt={2}
                    >
                      <Avatar
                        objectFit="cover"
                        alignSelf={"center"}
                        ml={2}
                        mr={2}
                        h={"50px"}
                        w={"50px"}
                        src={following?.profile_picture}
                      />

                      <Stack w={"400px"}>
                        <CardBody>
                          <Text
                            className="fullname"
                            fontSize={"12px"}
                            p={"1px"}
                          >
                            {following?.full_name}
                          </Text>

                          <Text
                            className="username"
                            fontSize={"12px"}
                            p={"1px"}
                          >
                            @{following?.username}
                          </Text>

                          <Text
                            className="username"
                            fontSize={"12px"}
                            p={"1px"}
                          >
                            {following?.profile_description}
                          </Text>
                        </CardBody>
                      </Stack>

                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        w={"120px"}
                      >
                        <Button
                          justifyContent={"center"}
                          borderRadius={"10px"}
                          border={"1px solid #fff"}
                          fontSize={"12px"}
                          p={4}
                          h={"20px"}
                          alignSelf={"center"}
                          onClick={() => handleClickFollow(following.id)}
                        >
                          Unfollow
                        </Button>
                      </Box>
                    </Card>
                  ))}
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
