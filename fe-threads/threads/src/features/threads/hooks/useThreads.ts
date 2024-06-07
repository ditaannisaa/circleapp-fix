import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "../../../libs/axios-threads";

export function useThreads() {
  const queryClient = useQueryClient();

  const { data: threads, refetch: refetchThreads } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const { data } = await Api.get("/threads");
      return data.data;
    },
  });

  const { mutate: handleLike } = useMutation({
    mutationFn: () => {
      return Api.post("/like", { thread: threads.id });
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
      return Api.delete(`/like/${threads.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleButtonUnlike = () => {
    handleUnlike();
  };

  return {
    threads,
    refetchThreads,
    handleButtonUnlike,
    handleButtonLike,
    handleLike,
    handleUnlike,
  };
}
