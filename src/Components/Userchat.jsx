import React, { useContext } from "react";
import userImg from "../../src/utils/images/user.png";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import { ChatContext } from "../context/ChatContext";
import { unReadNotif } from "../utils/unReadNotif";
import { useFetchLatestMessage } from "../hooks/useFetchLatestMessage";
import moment from "moment";
const Userchat = ({ chat, user }) => {
  console.log("chat in userchat", chat);
  console.log("user", user);

  const { recipientUser } = useFetchRecipient({ chat, user });
  const { onlineUsers,notif ,markThisUserNotifAsRead} = useContext(ChatContext);
  console.log("recipient user in userchat", recipientUser?.user?._id);
const unReadNotifs=unReadNotif(notif)
//to get individual count of notifs
const thisUserNotif = unReadNotifs?.filter((n) => n.senderId === recipientUser?.user?._id);
console.log('thisUserNotif',thisUserNotif)

const {latestMsg}=useFetchLatestMessage(chat)
const truncateText=(text)=>{
  let shorttext=text.substring(0,20)
  if(text.length >20)
  shorttext=shorttext+"..."
return shorttext

}

  return (
    <div className="flex-col " onClick={()=>{
      if(thisUserNotif?.length !==0)
      markThisUserNotifAsRead(thisUserNotif,notif)
    }}>
      <div className="flex-col items-center justify-center ">
        <div className="flex-[0.4] flex items-start gap-3    ">
          <div className="">
            <img
              class="w-20 h-15 rounded-3xl"
              src={userImg}
              alt="Default avatar"
            ></img>
          </div>
          <div className="flex justify-between  items-center gap-6 w-[14rem]">
            <div className=" flex flex-col">
              {/* priyal and text flex col  */}
              <div className="font-bold capitalize">{recipientUser?.user?.name}</div>
              <div>{latestMsg?.text && (<span>{truncateText(latestMsg?.text)}</span>)}</div>
            </div>
            <div className=" flex flex-col items-center ml-auto">
              {/* priyal and text flex col  */}
              <span
                className={`${
                  onlineUsers?.some(
                    (user) => user.userID === recipientUser?.user?._id
                  )
                    ? "h-[10px] w-[10px] rounded-lg bg-green-400  inline-block"
                    : ""
                }`}
              ></span>
              <div>{latestMsg?.createdAt && moment(latestMsg?.createdAt).calendar()}</div>
              <div className={thisUserNotif?.length > 0 ?'rounded-lg bg-gray-400 w-5 text-center':" "}>{thisUserNotif?.length > 0 ? thisUserNotif?.length:""} </div>
            </div>
          </div>
        </div>
        <hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default Userchat;
