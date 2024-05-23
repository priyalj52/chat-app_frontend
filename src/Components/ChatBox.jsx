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
    return <p className="text-center mb-[70vh] ">No conversation selected !!!</p>;
  if (isMessageLoading) return <p>Loading Chat Messages</p>;
  if (recipientUser)
    return (
      <div className="flex flex-col  justify-between h-[70vh]">
        <div className="bg-black/20  text-center  ">
          <strong className="capitalize text-white ">{recipientUser?.user?.name}</strong>
        </div>
        <div className="overflow-y-auto bg-black text-black/20 ">
          {messages &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg?.senderId === user?.id
                    ? "flex justify-end rounded"
                    : "flex justify-start"
                } p-2  `}
                ref={scroll}
              >
                <div className="bg-white rounded ">

             
                <div className="flex-col flex  ">
                

              
                  <div className="text-lg  text-black p-2 ">
                    {msg?.text}
                  </div>
                  <div className="text-xs  rounded p-1 text-[##9CA3AF] font-semibold" style={{width:'fit-content'}}>
                    {moment(msg.createdAt).calendar()}
                
                  </div>
                  </div>
                </div>
                <div></div>
              </div>
            ))}
        </div>
      </div>
    );
};

export default ChatBox;
