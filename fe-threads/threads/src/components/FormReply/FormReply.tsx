import { ChangeEvent } from "react";
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
import { PostThread } from "../../types/PostThreadType";
import { useState, useRef } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Api } from "../../libs/axios-threads";
import { PostReply } from "../../types/PostReplyType";
import { RepliesType } from "../../types/RepliesType";
import { useParams } from "react-router-dom";
import { useUser } from "../../features/threads/hooks/useUser";

export default function FormReply() {
  const { id } = useParams();
  // console.log(threadId);
  const user = useUser();
  const [formsReply, setFormReply] = useState<PostReply>({
    text: "",
    image: "",
    thread: Number(id),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    console.log(event.target);

    if (files) {
      setFormReply({
        ...formsReply,
        [name]: files[0],
      });
    } else {
      setFormReply({
        ...formsReply,
        [name]: value,
      });
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleClick() {
    fileInputRef.current?.click();
  }

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formsReply: any) => {
      const formData = new FormData();
      formData.append("text", formsReply.text);
      formData.append("image", formsReply.image);
      formData.append("image", formsReply.thread.toString());

      return Api.post("/reply", formsReply);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["thread", id] });
      setFormReply({
        text: "",
        image: "",
        thread: Number(id),
      });
    },
    onError: (err) => {
      console.log(err, `${err}`);
    },
  });

  return (
    <Box mb={6}>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formsReply);
        }}
      >
        <InputGroup>
          <Input
            placeholder="Your comment"
            borderRadius={10}
            p={1}
            name="text"
            width={"500px"}
            mb={4}
            onChange={handleInputChange}
            color={"blackAlpha.700"}
          />

          <InputRightElement>
            <Button width={70} borderRadius={10}>
              <BiSolidImageAdd
                fontSize={"25px"}
                color={"#2e7841"}
                onClick={handleClick}
              />
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
      </form>
    </Box>
  );
}
