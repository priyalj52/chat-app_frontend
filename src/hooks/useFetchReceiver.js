import { useEffect, useState } from "react";
import { baseURL, getRequest } from "../utils/api";

export const useFetchReciever = ({ currentChat, user }) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  
  // console.log(
  //   "user jo hook mei",
  //   user,
  //   "currentChat jo hook mei aayi",
  //   currentChat
  // );
  const recipientUserId = currentChat?.members.find((id) => id !== user?.id);
  console.log(
    "useFetchRecipient",
    currentChat,
    user,
    "recipientUserId:",
    recipientUserId
  );

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
