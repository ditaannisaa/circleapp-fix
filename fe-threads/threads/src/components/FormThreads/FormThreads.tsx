import {
  Box,
  Heading,
  InputGroup,
  Avatar,
  Input,
  Button,
  InputRightElement,
  FormControl,
} from "@chakra-ui/react";
import { BiSolidImageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/type/RootState";
import { ChangeEvent, useState, useRef } from "react";
import { PostThread } from "../../types/PostThreadType";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Api } from "../../libs/axios-threads";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../store/RootReducer";
import { useUser } from "../../features/threads/hooks/useUser";

export default function FormThreads() {
  const [formsThreads, setFormThreads] = useState<PostThread>({
    content: "",
    image: "",
  });
  const queryClient = useQueryClient();
  const profile = useSelector((state: any) => state.auth.profile_picture);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files) {
      setFormThreads({
        ...formsThreads,
        [name]: files[0],
      });
    } else {
      setFormThreads({
        ...formsThreads,
        [name]: value,
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleClick() {
    fileInputRef.current?.click();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: any) => {
      return Api.post("/thread", formData);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      setFormThreads({
        content: "",
        image: "",
      });
    },
    onError: (err) => {
      console.log(err, "mutate error");
    },
  });

  const { data: pic } = useQuery({
    queryKey: ["pic"],
    queryFn: async () => await Api.get("/auth/check").then((res) => res.data),
  });

  return (
    <Box p={2}>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("content", formsThreads.content);
          formData.append("image", formsThreads.image);
          mutate(formData);
        }}
      >
        <Box>
          <FormControl>
            <InputGroup size="xl" gap={4}>
              <Avatar
                h={"30px"}
                w={"30px"}
                objectFit={"cover"}
                src={pic?.user?.profile_picture}
              />
              <Box gap={4} w={"100%"}>
                <InputGroup>
                  <Input
                    placeholder="What is happening?"
                    borderRadius={10}
                    p={1}
                    name="content"
                    width={"100%"}
                    mb={4}
                    onChange={handleInputChange}
                    color={"blackAlpha.700"}
                  />

                  <InputRightElement>
                    <Button width={70} borderRadius={10} onClick={handleClick}>
                      <BiSolidImageAdd fontSize={"25px"} color={"#2e7841"} />
                    </Button>
                    <Input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                    <Button
                      bg={"#2e7841"}
                      p={1}
                      borderRadius={10}
                      width={70}
                      type="submit"
                      isLoading={isPending}
                    >
                      Post
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </InputGroup>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
}
