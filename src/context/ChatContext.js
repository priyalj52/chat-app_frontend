// import { verifyToken } from "../utils/jwtUtils";
import { baseURL, getRequest, postRequest } from "../utils/api";
import { io } from "socket.io-client";
const { createContext, useState, useEffect, useCallback } = require("react");

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setuserChats] = useState([]);
  const [isChatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setMessagesLoading] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [newMsg, setNewMsg] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const[notif,setNotif]=useState([])
const [allUsers,setAllUsers]=useState([])


  console.log("user from api", user); // user currently has token and username
  console.log("userchats",userChats);
  console.log("current chats hook", currentChat);
  console.log("online users", onlineUsers);
  console.log("notifications",notif)
  console.log("new msg",newMsg)
  // console.log("cuurent messages getmsg function", currentChat);


  //initial socket
  useEffect(() => {
    const newSocket = io("http://localhost:5000"); //spcket port
    // const newSocket = io("http://chat-app-socket-p8dp.onrender.com"); 
  
    console.log("socket connected on 5000 client")
    newSocket.connect()
    setSocket(newSocket);
    //cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  //trigger the addnewuser event on socket
  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?.id);
    const handleOnlineUsers = (res) => {
      setOnlineUsers(res);
    };

    socket.on("getOnlineUsers", handleOnlineUsers);

    // return () => {
    //   // This cleanup function will remove the event listener when the component unmounts.
    //   socket.off("getOnlineUsers");
    // };
  }, [socket, user]);

  //send message
  useEffect(() => {
    if (socket == null) return;
    console.log("new msg send socket recid userchats",userChats)
    const recipientUserId = currentChat?.members.find((id) => id !== user?.id);
    // const recipientId = userChats.map((users,ind)=>console.log(users.members,"bitch"))
    // // .members?.find((id) => id !== user.id);
    // console.log(userChats?.members,"members array123")
    console.log("new msg send socket recid",recipientUserId)
    // const messageToSend = [];
    // console.log("new msg send socket is message",messageToSend)
    socket.emit("sendMsg", {...newMsg, recipientUserId});
  }, [newMsg]);

  //recieve text msg+notif
  useEffect(() => {
    if (socket == null) return;
    socket.on("getTextMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

socket.on("getNotif",(res)=>{
  //if chat is currently opened or not
  const isChatOpen=currentChat?.members.some((id)=>id===res.senderId)
  console.log('Previous State: open', isChatOpen);
  console.log ("heyyyyyyyyyyyyyyyyyyyyyyy")
  // if(isChatOpen)
  // setNotif((prev)=>[{isRead:true,...res},...prev])
  // console.log('Previous State:', notif);
  if (isChatOpen) {
    console.log('Previous State:', notif); // Log the previous state
    setNotif((prev) => [{ isRead: true, ...res }, ...prev]);
  }
else
setNotif((prev)=>[res,...prev])
  
  
})

    return () => {socket.off("getTextMessage");
    socket.off("getNotif");}
  }, [socket,currentChat]);

  useEffect(() => {
    const getUserChats = async () => {
      const token = user?.token;
      // const userId =verifyToken(token)
      //if(user?._id)
      if (user?.id) {
        // console.log("userId",userId)
        setChatLoading(true);
        setChatError(null);
        const response = await getRequest(`${baseURL}/chats/${user?.id}`); //find  chats with all users for that particular login id
        console.log("data from response ", response);
        setChatLoading(false);
        if (response.error) return setChatError(response.msg);
        setuserChats(response?.chat);
      }
    };
    getUserChats();
  }, [user,notif]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseURL}/user`); //brings all the users
 
      if (response.error)
        return console.log("error in fetching users", response.error);
      //list all the potential chats
        const pChats = response.filter((u) => {
        if (user?.id === u._id) return false; //dont take current user in pchats
        let isChatCreated = false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat?.members[0] === u._id || chat?.members[1] === u._id; //if the reciever(u) is already there or not
          });
        }
        return !isChatCreated;// return false if user chat found as iscreated=true otheriese also 
        //return true if chatcreate is false as we want to include that u in potential chats 
      });
      setPotentialChats(pChats);
      setAllUsers(response)
    };
    getUsers();
  }, [userChats]); //called again whenever userchat is added as potential chats decreases




  const createChat = useCallback(
    async (firstId, secondId) => {
      const response = await postRequest(
        `${baseURL}/chats`,
        JSON.stringify({
          firstId,
          secondId,
        })
      );
      

      console.log("response from create", response);
      console.log("usechats in create before exceute function", userChats);
      if (response.error)
        return console.log(response.error, "error creating chat");
        console.log("prev msg",messages)
        //userchats
        // userchjat has chat,msg, status
      setuserChats((prev) => {
       
  //      // Assuming 'response' is the object with the 'chat' array
  // const updatedChat = [...prev.chat, response];

  // Update the 'chat' property within 'prev' with the updated 'chat' array
  return [ ...prev, response.response ];
      });
    },
    []
  );



  const updateChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  
  
  
  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessageError(null);
      const response = await getRequest(
        `${baseURL}/message/${currentChat?._id}`
      );

      console.log("data from response in getmsg ", response);
   
      setMessagesLoading(false);
      if (response.error) return setMessageError(response.msg);
      setMessages(response?.messages);//all messages of that chat
   
    };
    getMessages();
  }, [currentChat]);




  const sendMsg = useCallback(
    async (textMsg, sender, currChatId, setTextMsg) => {
      if (!textMsg) return console.log("You must type Something!");
      const response = await postRequest(
        `${baseURL}/message`,
        JSON.stringify({
          chatId: currChatId,
          senderId: sender?.id,
          text: textMsg,
        })
      );
      console.log("after sending",response)
      if (response?.error) return setTextError(response?.error);
      setNewMsg(response?.response);
      console.log("prev msg",messages)
      setMessages((prev) => [...prev, response.response]);
      console.log("new  msgess",messages) //msg update on next call
      setTextMsg("");
    },
    []
  );

const markAllNotifAsRead=useCallback((notif)=>{
const markNotifs=notif?.map((n)=>{
  return ({...n,isRead:true}) //make isread true
})
setNotif(markNotifs)
},[])

const markNotifRead=useCallback((n,user,userChats,notif)=>{
//find chat to open

const desiredChat=userChats?.find((chat)=>{
  const chatMembers=[user.id,n.senderId]
  const isDesiredChat=chat?.members.every((member)=>{
    return chatMembers.includes(member)
  })
  return isDesiredChat
})

const mnotif=notif.map((el)=>{
  if(el.senderId===n.senderId)
  return {...n,isRead:true}
else
return {el}
})
updateChat(desiredChat)
setNotif(mnotif)
},[])

const markThisUserNotifAsRead=useCallback((thisUserNotif,notif)=>{
//mark notif as read

const mNotifs=notif?.map(el=>{
  let notification;
  thisUserNotif.forEach(n => {
    if(n.senderId===el.senderId)
    notification={...n,isRead:true}
  else
  notification=el;
  });
  return notification
})
setNotif(mNotifs)
},[])
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatLoading,
        chatError,
        potentialChats,
        createChat,
        updateChat,
        messages,
        messageError,
        isMessageLoading,
        currentChat,
        sendMsg,
        onlineUsers,
        notif,
        allUsers,markAllNotifAsRead,
        markNotifRead,markThisUserNotifAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
