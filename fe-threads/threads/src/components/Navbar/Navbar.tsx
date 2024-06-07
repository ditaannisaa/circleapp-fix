import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { GoHomeFill } from "react-icons/go";
import { RiUserSearchLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "../../store/RootReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(AUTH_LOGOUT());
    navigate("/auth/login");
  };

  const handleToFollow = () => {
    navigate("/follow");
  };

  const handleToSearch = () => {
    navigate("/search");
  };

  const handleToProfile = () => {
    navigate("/profile");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      p={4}
      position={"fixed"}
      minH="100vh"
    >
      <Box mb={4}>
        <Heading fontSize={40} fontWeight={"medium"} color={"green.300"}>
          circle
        </Heading>
      </Box>
      <Stack spacing={4}>
        <Button justifyContent={"start"} onClick={handleHome}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"start"}
          >
            <GoHomeFill />
            <p>Home</p>
          </Box>
        </Button>
        <Button justifyContent={"start"} onClick={handleToSearch}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"start"}
          >
            <RiUserSearchLine />
            <p>Search</p>
          </Box>
        </Button>
        <Button justifyContent={"start"} onClick={handleToFollow}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"start"}
          >
            <AiOutlineHeart />
            <p>Follow</p>
          </Box>
        </Button>
        <Button justifyContent={"start"} onClick={handleToProfile}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"start"}
          >
            <FaRegUserCircle />
            <p>Profile</p>
          </Box>
        </Button>

        <Button bg={"#2e7841"} borderRadius="20px" p={2} w={"250px"}>
          Create Post
        </Button>

        <Button
          mt={2}
          mb={2}
          p={4}
          w={"100px"}
          borderRadius={10}
          fontSize={"15px"}
          onClick={handleLogout}
          position="absolute"
          bottom="0"
        >
          <BiLogOut color="white" fontSize={"25px"} />
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
