import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TLogin } from "../../../types/UserType";
import { Api } from "../../../libs/axios-threads";
import { useQuery } from "@tanstack/react-query";

export function useLike() {
  const { data: likes } = useQuery({
    queryKey: ["likes"],
    queryFn: async () => await Api.get("/likes").then((res) => res.data),
  });

  return likes;
}
