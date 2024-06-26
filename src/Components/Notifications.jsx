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
    <div className='flex-col items-end flex justify-center gap-2 cursor-pointer' >
{/* Notifications */}
<div  className='flex'  onClick={()=>setIsNotifOpen(!isNotifOpen)}>
<BsFillChatLeftFill title='click to view notifications' size={25}/>
{(unreadNotif?.length===0)?null:(<span className=' h-[20px] text-bold text-center w-[20px] bg-gray-200 rounded-3xl text-center text-black '>{unreadNotif?.length} </span>)}
</div>

{isNotifOpen && (
<div className='bg-white'>

<div className='bg-black  flex items-between justify-end gap-3 bg-gray-100 rounded text-black '>
<span className='p-1'>Notifications</span>
    <span onClick={()=>markAllNotifAsRead(notif)} className='cursor-pointer p-1 bg-gray-100 rounded hover:bg-[#9CA3AF]'>Mark all as Read</span>

   
   
</div>
{modifiedNotif.length===0?<span className='text-black'>No notification yet</span>:null}
{modifiedNotif && modifiedNotif.map((n,ind)=>{
    return(
        <div key={ind} className={n.isRead?' text-black':'bg-black text-white hover:bg-[#9CA3AF]'} onClick={()=> { markNotifRead(n,user,userChats,notif) ; setIsNotifOpen(false)} } >
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