import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Api } from "../../../libs/axios-threads";

export function useDetailThread() {
  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data: thread, isLoading } = useQuery({
    queryKey: ["thread", id],
    queryFn: async () => {
      const { data } = await Api.get(`/thread/${id}`);
      return data;
    },
  });

  const { mutate: handleLike } = useMutation({
    mutationFn: () => {
      return Api.post("/like", { thread: thread.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thread", id] });
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
      return Api.delete(`/like/${thread.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thread", id] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleButtonUnlike = () => {
    handleUnlike();
  };

  return {
    thread,
    isLoading,
    handleButtonUnlike,
    handleButtonLike,
    handleLike,
    handleUnlike,
  };
}
