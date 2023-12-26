import { useEffect, useState } from "react";
import { baseURL, getRequest } from "../utils/api";

export const useFetchRecipient = ({ chat, user }) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // const chat =  chat;
  // // console.log(
  // //   "user jo hook mei",
  // //   user,
  // //   "chat jo hook mei aayi",
  // //   chat
  // // );
  const recipientUserId = chat?.members?.find((id) => id !== user?.id);
  // console.log(
  //   "useFetchRecipient",
  //   chat,
  //   user,
  //   "recipientUserId:",
  //   recipientUserId
  // );

  useEffect(() => {
    const getUser = async () => {
      if (!recipientUserId) return null;
      const response = await getRequest(
        `${baseURL}/user/find/${recipientUserId}`
      );
      if (response.error) return setError(response.error);
      setRecipientUser(response);
    };

    getUser();
  }, [recipientUserId]);

  return { recipientUser, error };
};
