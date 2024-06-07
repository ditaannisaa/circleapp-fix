import { ChangeEvent, useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  Stack,
  Input,
  Avatar,
} from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import { UserUpdate } from "../../../types/UserType";
import { Api } from "../../../libs/axios-threads";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function EditProfile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<UserUpdate>({
    full_name: user?.full_name,
    username: user?.username,
    email: user?.email,
    profile_description: user?.profile_description,
  });

  console.log(form, "data");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const { mutate } = useMutation({
    mutationFn: (form) => {
      return Api.patch(`/user/${user?.user?.id}`, form);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log(err, "mutate error");
    },
  });

  function handleUpdateProfile() {
    try {
      mutate(form);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box
      position="relative"
      bg={"#252927"}
      boxSizing="border-box"
      p="10px"
      borderRadius="20px"
      w={"550px"}
    >
      <Text color="white" mb="10px">
        My Profile
      </Text>
      <Box mb={20}>
        <Box borderRadius={"20px"} m={2}>
          <Image
            display={"flex"}
            borderRadius={"10px"}
            position={"relative"}
            w={"540px"}
            h={"80px"}
            src={user?.user?.profile_picture}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          position={"absolute"}
          top={"100px"}
          right={"-30px"}
          width={"full"}
        >
          <Avatar
            h={"70px"}
            w={"70px"}
            border={"5px solid #262626"}
            bg={"#262626"}
            src={user?.user?.profile_picture}
          />
        </Box>
      </Box>

      <Stack spacing={3}>
        <Text fontSize={"15px"} color="#ccc5b9">
          Edit Full Name
        </Text>
        <Input
          variant="outline"
          placeholder={user?.user?.full_name}
          name="full_name"
          color={"gray.500"}
          onChange={handleChange}
          borderRadius={5}
        />
        <Text fontSize={"15px"} color="#ccc5b9">
          Edit Username
        </Text>
        <Input
          variant="outline"
          placeholder={user?.user?.username}
          name="username"
          color={"gray.500"}
          borderRadius={5}
          onChange={handleChange}
        />
        <Text fontSize={"15px"} color="#ccc5b9">
          Edit Profile Description
        </Text>
        <Input
          variant="outline"
          placeholder={user?.user?.profile_description}
          name="profile_description"
          color={"gray.500"}
          borderRadius={5}
          onChange={handleChange}
        />
        <Button
          color={"green.300"}
          variant={"outline"}
          w={"100px"}
          ml="auto"
          onClick={handleUpdateProfile}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
}
