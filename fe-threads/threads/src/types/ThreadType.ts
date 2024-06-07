export type LikeType = {
  id: number;
  user: {
    id: number;
  };
};

type IThreads = {
  id: number;
  content: string;
  image: string;
  posted_at: string;
  user: {
    username: string;
    full_name: string;
    profile_picture: string;
  };
  reply: {
    text: string;
    image: string;
  }[];
  like: LikeType[];
};

export default IThreads;
