import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { baseURL, getRequest } from '../utils/api'

export const useFetchLatestMessage = (chat) => {
const {newMsg,notif}=useContext(ChatContext)
const [latestMsg,setLatestMsg]=useState(null)

useEffect(()=>{
const getMesssages=async()=>{
    const response=await getRequest(`${baseURL}/message/${chat?._id}`)
    console.log("response in fetchmessage hook",response.messages)
    if(response.error)
    return console.log("error in fetching message")
const lastMessage=response?.messages[response?.messages?.length-1]
console.log("last message",lastMessage)
setLatestMsg(lastMessage)
}

getMesssages()


},[newMsg,notif])
return {latestMsg}

}
