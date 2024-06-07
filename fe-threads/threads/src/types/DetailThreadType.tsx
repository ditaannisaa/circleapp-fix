export type DetailThreadType = {
    id: number,
    content: string,
    image: string,
    posted_At: string,
    user: {
        username: string;
        profile_picture: string;
    };
    reply?: {
        text: string;
        image: string;
    };
    like: {
        id: number;
    };


}