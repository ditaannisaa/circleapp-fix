import Home from "./pages/Home/home";
import { Route, Routes, useNavigate, Navigate, Outlet } from "react-router-dom";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";

import Main from "./layout/main";
import DetailThread from "./pages/Detail Thread/DetailThread";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/type/RootState";
import { useDispatch } from "react-redux";
import { Api, setAuthToken } from "./libs/axios-threads";
import { AUTH_ERROR } from "./store/RootReducer";
import Follow from "./pages/Follow/Follow";
import Search from "./pages/Search/Search";
import Profile from "./components/MyProfile/Profile";
import UserProfile from "./features/threads/components/UserProfile";
import EditProfile from "./features/threads/components/EditProfile";

const theme = extendBaseTheme({
  styles: {
    global: {
      body: {
        bg: "#222",
        color: "#fff",
      },
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await Api.get("/auth/check");
      console.log("authCheck: ", response);
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      console.log("authCheck error", err);
      setIsLoading(false);
      navigate("/auth/login");
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  });

  function IsNotLogin() {
    if (!token) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsLogin() {
    if (token) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<IsNotLogin />}>
              <Route
                path="/"
                element={
                  <Main>
                    <Home />
                  </Main>
                }
              />
              <Route
                path="/detail-thread/:id"
                element={
                  <Main>
                    <DetailThread />{" "}
                  </Main>
                }
              />
              <Route
                path="/follow"
                element={
                  <Main>
                    <Follow />{" "}
                  </Main>
                }
              />
              <Route
                path="/search"
                element={
                  <Main>
                    <Search />{" "}
                  </Main>
                }
              />
              <Route
                path="/profile"
                element={
                  <Main>
                    <UserProfile />{" "}
                  </Main>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <Main>
                    <EditProfile />{" "}
                  </Main>
                }
              />
            </Route>

            <Route path="/" element={<IsLogin />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Route>
          </Routes>
        </ChakraProvider>
      )}
    </>
  );
}

export default App;
