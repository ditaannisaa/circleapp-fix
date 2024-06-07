import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TLogin } from "../../../types/UserType";
import { Api } from "../../../libs/axios-threads";
import { AUTH_CHECK, AUTH_LOGIN } from "../../../store/RootReducer";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<TLogin>({
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      const response = await Api.post("/auth/login", form);
      console.log(response);
      //redux store redux
      dispatch(AUTH_LOGIN(response.data));
      dispatch(AUTH_CHECK(response.data));

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return { form, handleChange, handleLogin };
}
