import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import { ChatContext } from "../context/ChatContext";
import Userchat from "../Components/Userchat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../Components/PotentialChats";
import ChatBox from "../Components/ChatBox";
import InputEmoji from "react-input-emoji";
import { AiOutlineSend } from "react-icons/ai";
export const Chat = () => {
  const {
    userChats,
    isChatLoading,
    chatError,
    updateChat,
    sendMsg,
    currentChat,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  console.log("user in chat page", user);

  console.log("userChats", userChats);
  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <div className="flex  items-start gap-5 m-5 justify-start ">
          {isChatLoading && <p>Loading chats......</p>}
          <div className="flex-[0.4]">
            {userChats?.map((chat, index) => {
              return (
                <div className="flex-col flex gap-2 capitalize">
                  <div
                    key={index}
                    onClick={() => {
                      updateChat(chat);

                      console.log("chat in frontened", chat);
                    }}
                  >
                    <Userchat chat={chat} user={user} />
                    {/* {console.log(chat, "userchat mei jaarhi")} */}
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" flex-[0.6] bg-[#292929]  text-white">
          <div className=" flex flex-col  ">
            <div className="">
            <ChatBox />
            </div>
         
            <div className="flex m-2 ">
              <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
              />
              <button
                type="button"
                onClick={() => sendMsg(text, user, currentChat?._id, setText)}
              >
                <AiOutlineSend
                  size={30}
                  className="rounded-2xl p-2 bg-black text-white"
                />
              </button>
            </div>
          </div>
          </div>
         
        </div>
      )}
    </>
  );
};
