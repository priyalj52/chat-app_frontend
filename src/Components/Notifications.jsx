import React, { useContext, useState } from 'react'
import {BsFillChatLeftFill}from "react-icons/bs"
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { unReadNotif } from '../utils/unReadNotif'
import moment from 'moment'
const Notifications = () => {
  const [isNotifOpen,setIsNotifOpen]=useState(false)
  const {notif,userChats,allUsers,markAllNotifAsRead, markNotifRead} =useContext(ChatContext)
  const {user}=useContext(AuthContext)
  const unreadNotif=unReadNotif(notif)

   const modifiedNotif=notif?.map((n)=>{
    const sender=allUsers?.find((user)=>user._id===n.senderId)
    return{...n,senderName:sender?.name}
   })

console.log("un",unreadNotif?.length)
console.log("mod",modifiedNotif)
    return (
    <div className='flex-col items-end flex justify-center gap-2' >
{/* Notifications */}
<div  className='flex' onClick={()=>setIsNotifOpen(!isNotifOpen)}>
<BsFillChatLeftFill size={25}/>
{(unreadNotif?.length===0)?null:(<span className='absolute top-2 right-[5.5rem] h-[20px] w-[20px] bg-gray-200 rounded-3xl text-center '>{unreadNotif?.length} </span>)}
</div>

{isNotifOpen && (
<div className='bg-white'>

<div className='bg-black text-white flex items-between justify-end gap-3'>
<span>Notifications</span>
    <span onClick={()=>markAllNotifAsRead(notif)} className='cursor-pointer'>Mark all as Read</span>

   
   
</div>
{modifiedNotif.length===0?<span>No notification yet</span>:null}
{modifiedNotif && modifiedNotif.map((n,ind)=>{
    return(
        <div key={ind} className={n.isRead?' text-black':'bg-black text-white'} onClick={()=> { markNotifRead(n,user,userChats,notif) ; setIsNotifOpen(false)} } >
            <br></br>
            <p><strong>{n.senderName} sent you a message</strong></p>
            <p>{moment(n.date).calendar()}</p>
            </div>
            )})}

</div>

)}
    </div>
  )
}

export default Notifications