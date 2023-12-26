import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  console.log("Potential chats", potentialChats);
  const online = {
    height: "12px",
    width: "12px",
    background: "green",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    top: "3.5rem",
  };

  return (
    <div className="flex items-center justify-start gap-3 m-3">
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div key={index} onClick={() => createChat(user.id, u._id)}>
              <span className="bg-gray-400 capitalize text-white p-2 rounded-lg text-center">
                {u.name}
                <span
                  className={`${
                    onlineUsers?.some((user) => user.userID === u?._id)
                      ? "h-[12px] w-[10px] rounded-lg bg-green-400 absolute top-[3.75rem] inline-block"
                      : ""
                  }`}
                ></span>
                {console.log("user name in PChats", u.name)}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
