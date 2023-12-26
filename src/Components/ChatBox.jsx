import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import moment from "moment";
import { useFetchReciever } from "../hooks/useFetchReceiver";

const ChatBox = () => {
  const { user } = useContext(AuthContext);

  const { currentChat, messages, isMessageLoading, messageError } =
    useContext(ChatContext);
  console.log("cuuren caddwbdwjd", currentChat);
  console.log("ndej user", user);
  const { recipientUser } = useFetchReciever({ currentChat, user });
  console.log(recipientUser, "recccccccc");
  console.log(recipientUser?.user, "rec user in chatbox");
  console.log("mesagesss", messages);
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser)
    return <p className="text-center ">No conversation selected !!!</p>;
  if (isMessageLoading) return <p>Loading Chat Messages</p>;
  if (recipientUser)
    return (
      <>
        <div className="bg-gray-500/50 text-center  ">
          <strong className="capitalize">{recipientUser?.user?.name}</strong>
        </div>
        <div className="overflow-y-auto ">
          {messages &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg?.senderId === user?.id
                    ? "flex justify-end "
                    : "flex justify-start"
                } p-2  `}
                ref={scroll}
              >
                <div className="flex-col flex ">
                  <div className="text-lg bg-black text-white  p-2 ">
                    {msg?.text}
                  </div>
                  <div className="text-xs bg-white  rounded p-1">
                    {moment(msg.createdAt).calendar()}
                  </div>
                </div>
                <div></div>
              </div>
            ))}
        </div>
      </>
    );
};

export default ChatBox;
