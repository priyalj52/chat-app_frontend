import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
const Register = () => {
    const {registerInfo,updateUserInfo,registerUser,registerError,isRegisterLoading}=useContext(AuthContext)
  return (
    <>
       <Navbar/>
  
    <div className="mt-[8rem]">
     
      <form method="POST"
        className=" max-w-[500px] m-auto bg-white/30
            rounded-2xl
            shadow-md
            backdrop-blur-md
            border-opacity-20  p-6 "
    onSubmit={registerUser}
      >
        <div className=" text-white ">
        <h3 className='text-black text-bold text-xl text-center'> Register</h3>
          <div className="flex-col items-center justify-center text-black m-4">
            <div className="flex-col flex gap-4 rounded">
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="text-white rounded bg-black p-2"
                onChange={(e)=>{
                    updateUserInfo({...registerInfo,name:e.target.value})
                }}
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className=" text-white bg-black p-2"
                onChange={(e)=>{
                    updateUserInfo({...registerInfo,email:e.target.value})
                }}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className=" text-white bg-black p-2"
                onChange={(e)=>{
                    updateUserInfo({...registerInfo,password:e.target.value})
                }}
              />
            </div>

            <div
              className="flex  justify-center items-center mx-auto mt-4 p-2 text-white rounded-md bg-black hover:bg-black/10 "
              style={{ }}
            >
              <button type="submit"  >

              {isRegisterLoading?"Creating Your account":"Register "}
              </button>
      
          
            </div>
            {registerError  && 
                 <p className="bg-red-200 mt-2">{registerError}</p>
            }
       
            {/* <button onClick={()=>toast.error("Enter correct passowrd")} type="button">HI</button> */}
            {/* {toast.error("Enter correct passowrd")} */}
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default Register;
