import { TUser } from "../../../types/UserType";
import { useUser } from "./useUser";

export const useFilterUsers = (searchKeyword: string) => {
  const { allUser } = useUser();

  if (!allUser) {
    return { filteredUsers: [] };
  }

  const filteredUsers = allUser.filter((user: TUser) => {
    if (user.username) {
      return user.username.toLowerCase().includes(searchKeyword.toLowerCase());
    }
    return false;
  });

  return { filteredUsers };
};
