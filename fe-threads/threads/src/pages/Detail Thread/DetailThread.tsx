import {
  Box,
  Avatar,
  Text,
  Button,
  Image,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import FormReply from "../../components/FormReply/FormReply";
import { RepliesType } from "../../types/RepliesType";
import { useUser } from "../../features/threads/hooks/useUser";
import { LikeType } from "../../types/ThreadType";
import { useDetailThread } from "../../features/threads/hooks/useDetailThread";

export default function DetailThread() {
  const { user } = useUser();
  const { handleButtonLike, handleButtonUnlike, thread, isLoading } =
    useDetailThread();

  if (isLoading) return <Progress value={80} />;

  return (
    <Box display={"flex"} flexDirection={"column"} p={4} gap={4} mt={4}>
      <Box gap={4} h={"full"}>
        <Box>
          <Box className="content" display={"flex"} gap={4}>
            <Avatar
              h={"30px"}
              w={"30px"}
              objectFit={"cover"}
              src={thread?.user?.profile_picture}
            />
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Box display={"flex"} flexDirection={"row"} gap={2}>
                <Text fontSize={12} fontWeight={"medium"}>
                  {thread?.user?.username}
                </Text>
                <Text fontSize={12}>{thread.user?.username}</Text>
                <Text fontSize={12}>4h</Text>
              </Box>
              <Text fontSize={12}>{thread?.content}</Text>
              {thread?.image ? (
                <Box>
                  <Image
                    objectFit={"cover"}
                    boxSize={"400px"}
                    src={thread?.image}
                  />
                </Box>
              ) : (
                <Box></Box>
              )}

              <Box display={"flex"} gap={4} mb={4}>
                <Box display={"flex"} gap={2}>
                  {thread?.like
                    .map((like: LikeType) => like?.user?.id)
                    .includes(user?.user?.id) ? (
                    <Button onClick={handleButtonUnlike}>
                      <AiTwotoneHeart color={"red"} />
                    </Button>
                  ) : (
                    <Button onClick={handleButtonLike}>
                      <AiOutlineHeart />
                    </Button>
                  )}
                  <Text fontSize={12}>{thread?.like?.length}</Text>
                </Box>
                <Box display={"flex"} gap={2}>
                  <LiaComment />
                  <Text fontSize={12}>{thread?.reply?.length} replies</Text>
                </Box>
              </Box>

              <Box>
                <FormReply />
                {thread?.reply?.map((data: RepliesType) => (
                  <Box
                    className="reply-content"
                    display={"flex"}
                    gap={4}
                    mb={4}
                  >
                    <Avatar
                      h={"30px"}
                      w={"30px"}
                      objectFit={"cover"}
                      src={data?.user?.profile_picture}
                    />
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                      <Box display={"flex"} flexDirection={"row"} gap={2}>
                        <Text fontSize={12} fontWeight={"medium"}>
                          {data?.user?.username}
                        </Text>
                        <Text fontSize={12}>{data?.user?.username}</Text>
                      </Box>
                      <Text fontSize={12}>{data?.text}</Text>
                      {!data?.image ? (
                        <Box></Box>
                      ) : (
                        <Box>
                          <Image
                            objectFit={"cover"}
                            boxSize={"400px"}
                            src={data?.image}
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
