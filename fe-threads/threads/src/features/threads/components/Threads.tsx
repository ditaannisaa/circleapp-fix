import { Box, Avatar, Text, Button, Image } from "@chakra-ui/react";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import IThreads from "../../../types/ThreadType";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../libs/axios-threads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";

export default function Threads(props: IThreads) {
  const { user } = useUser();
  const [timeDifference, setTimeDifference] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const threadTime = new Date(props?.posted_at);
    const currentTime = new Date();

    const differenceInMilliseconds =
      currentTime.getTime() - threadTime.getTime();
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
      setTimeDifference(`${years} years ago`);
      if (years === 1) {
        setTimeDifference(`${years} year ago`);
      }
    } else if (months > 0) {
      setTimeDifference(`${months} months ago`);
      if (months === 1) {
        setTimeDifference(`${months} month ago`);
      }
    } else if (weeks > 0) {
      setTimeDifference(`${weeks} weeks ago`);
      if (weeks === 1) {
        setTimeDifference(`${weeks} week ago`);
      }
    } else if (days > 0) {
      setTimeDifference(`${days} days ago`);
      if (days === 1) {
        setTimeDifference(`${days} day ago`);
      }
    } else if (hours > 0) {
      setTimeDifference(`${hours} hours ago`);
      if (hours === 1) {
        setTimeDifference(`${hours} hour ago`);
      }
    } else if (minutes > 0) {
      setTimeDifference(`${minutes} minutes ago`);
      if (minutes === 1) {
        setTimeDifference(`${minutes} minute ago`);
      }
    } else {
      setTimeDifference(`${seconds} seconds ago`);
      if (seconds === 1) {
        setTimeDifference(`${seconds} second ago`);
      }
    }
  });

  // console.log(timeDifference);

  const queryClient = useQueryClient();
  const { mutate: handleLike } = useMutation({
    mutationFn: () => {
      return Api.post("/like", { thread: props.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleButtonLike = () => {
    handleLike();
  };

  const { mutate: handleUnlike } = useMutation({
    mutationFn: () => {
      return Api.delete(`/like/${props.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (err) => {
      console.log(err, "error unlike");
    },
  });

  const handleButtonUnlike = () => {
    handleUnlike();
  };

  const handleNavigate = () => {
    // Gunakan fungsi navigate untuk melakukan navigasi ke rute lain
    navigate(`/detail-thread/${props.id}`);
  };
  return (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      <Box display={"flex"} gap={4} p={4}>
        <Avatar h={"30px"} w={"30px"} src={props.user?.profile_picture} />
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Box display={"flex"} flexDirection={"row"} gap={2}>
            <Text fontSize={12} fontWeight={"medium"}>
              {props.user?.username}
            </Text>
            <Text fontSize={12}>{props.user?.full_name}</Text>

            <Text fontSize={12}>{timeDifference}</Text>
          </Box>
          <Text fontSize={12}>{props.content}</Text>

          <Box>
            {!props.image ? (
              <Box></Box>
            ) : (
              <Box>
                <Image
                  objectFit={"cover"}
                  boxSize={"400px"}
                  src={props.image}
                  mb={3}
                />
              </Box>
            )}

            <Box display={"flex"} gap={4}>
              <Box display={"flex"} gap={2}>
                {props?.like
                  .map((like) => like?.user?.id)
                  .includes(user?.user?.id) ? (
                  <Button onClick={handleButtonUnlike}>
                    <AiTwotoneHeart color={"red"} />
                  </Button>
                ) : (
                  <Button onClick={handleButtonLike}>
                    <AiOutlineHeart />
                  </Button>
                )}

                <Text fontSize={12}>{props.like?.length}</Text>
              </Box>

              <Box display={"flex"} gap={2}>
                <LiaComment />
                <Button onClick={handleNavigate}>
                  <Text fontSize={12}>{props.reply?.length} replies</Text>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
