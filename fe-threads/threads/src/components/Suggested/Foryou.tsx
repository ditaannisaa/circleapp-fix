import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Avatar,
  Box,
  Text,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TUser } from "../../types/UserType";
import { useUser } from "../../features/threads/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../../libs/axios-threads";
import { AUTH_CHECK } from "../../store/RootReducer";
import { useDispatch } from "react-redux";
import { TFollow } from "../../types/FollowType";

export default function Foryou() {
  const [randomUsers, setRandomUsers] = useState<TUser[]>([]);
  const { allUser, user } = useUser();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUser && allUser.length > 0) {
      const shuffledUsers = [...allUser].sort(() => Math.random() - 0.5);
      const selectedUsers = shuffledUsers.slice(0, 3);
      setRandomUsers(selectedUsers);
    }
  }, [allUser]); //tambahkan users kalau mau reload

  const { mutate: handleFollow } = useMutation({
    mutationFn: (followId: number) => {
      return Api.post("/follow", { followingId: followId });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
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
    <Card p={4} bg={"#262626"}>
      <CardHeader mb={2}>
        <Heading fontWeight={"medium"}>Suggested for You</Heading>
      </CardHeader>
      <CardBody>
        <Stack>
          {randomUsers?.map((data: TUser) => (
            <Box display={"flex"}>
              <Box>
                <Avatar h={"40px"} />
              </Box>
              <Box>
                <Text fontSize={12}>{data?.full_name}</Text>
                <Text fontSize={12}>{data?.username}</Text>
              </Box>
              <Spacer />
              {/* <Box>
                <Button
                  borderRadius={"20px"}
                  background={isFollowing(user.user?.id) ? "red" : "green"}
                  height={"35px"}
                  width={"80px"}
                  onClick={() => handleClickFollow(data?.id)}
                >
                  {isFollowing(user?.user?.id) ? "Unfollow" : "Follow"}
                </Button>
              </Box> */}
              {user?.user?.following
                ?.map((follow: TFollow) => follow?.id)
                .includes(data.id) ? (
                <Box>
                  <Button
                    border={"1px solid #fff"}
                    borderRadius={10}
                    fontSize={"10px"}
                    p={2}
                    onClick={() => handleClickFollow(data?.id)}
                  >
                    Following
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    border={"1px solid #fff"}
                    borderRadius={10}
                    fontSize={"10px"}
                    p={2}
                    onClick={() => handleClickFollow(data?.id)}
                  >
                    Follow
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
