export type RepliesType = {
  id: number;
  text: string;
  image: string;
  created_At: string;
  updated_At: string;
  user: {
    username: string;
    profile_picture: string;
  };
  thread: {
    id: number;
    content: string;
    image: string;
  };
};
