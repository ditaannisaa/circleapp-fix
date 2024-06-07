export type TUser = {
  id: number;
  full_name?: string;
  username?: string;
  email?: string;
  profile_picture?: string;
  profile_description?: string;
  followers?: {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_picture?: any;
    profile_description?: string;
  }[];
  following?: {
    id: number;
    username: string;
    full_name: string;
    email: string;
    profile_picture?: string;
    profile_description?: string;
  }[];
};

export type TRegister = {
  full_name: string;
  username: string;
  email: string;
  password: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type UserUpdate = {
  full_name: string;
  username: string;
  email: string;
  profile_description: string;
};
