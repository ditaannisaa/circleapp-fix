import {ChangeEvent, useState, useRef} from "react"
import { PostThread } from "../../../types/PostThreadType"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Api } from "../../../libs/axios-threads"

export function usePostThread() {
    const [formsThreads, setFormThreads] = useState<PostThread>({
        content: "",
        image: "",
      })
      const queryClient = useQueryClient()
      const [file, setFile] = useState<File | null>(null)

      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target

        console.log({name, value, files})
        if (files) {
          setFormThreads({
            ...formsThreads,
            [name]: files[0],
          })
        } else {
          setFormThreads({
            ...formsThreads,
            [name]: value,
          })
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    function handleClick() {
      fileInputRef.current?.click();
    }


    const { mutate, isPending} = useMutation({
        mutationFn: async () => {
          const formData = new FormData()
          formData.append("content", formsThreads.content)
          formData.append("image", file as File )

          return await Api.post("/thread", formData)
        },
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["threads"]})
            setFormThreads({
                content: "",
                image: "",
            })
        },
        onError: (err) => {
          console.log(err,"mutate error")
        }
    })

    return {formsThreads, handleClick, handleInputChange, mutate, isPending, fileInputRef}
}