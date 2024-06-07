import { useQuery } from "@tanstack/react-query";
import { Api } from "../../../libs/axios-threads";
import { TUser, UserUpdate } from "../../../types/UserType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const navigate = useNavigate();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await Api.get("/auth/check").then((res) => res.data),
  });

  const { data: allUser, isLoading: isLoadingAllUser } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await Api.get("/users").then((res) => res.data),
  });

  const [form, setForm] = useState<UserUpdate>({
    full_name: "",
    username: "",
    email: "",
    profile_description: "",
  });

  function handleUpdateProfile() {
    try {
      const response = Api.patch(`/user/${user?.user}`, form);
      console.log(response);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return { user, allUser, isLoadingUser, isLoadingAllUser };
}
