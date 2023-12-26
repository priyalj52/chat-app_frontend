import React, { useContext } from 'react'
import Navbar from '../Components/Navbar';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
    const{loginUser,updateLoginUser,loginError,loginInfo,isLoginLoading}=useContext(AuthContext)
    return (
        <>
           <Navbar/>
      
        <div className="mt-[8rem]">
         
          <form
            className=" max-w-[500px] m-auto bg-white/30
                rounded-2xl
                shadow-md
                backdrop-blur-md
                border-opacity-20  p-6 "
            method="POST" onSubmit={loginUser}
          >
            <div className=" text-white ">
            <h3 className='text-black text-bold text-xl text-center'> Login</h3>
              <div className="flex-col items-center justify-center text-black m-4">
                <div className="flex-col flex gap-4 rounded">
              
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className=" text-white bg-black p-2"
                    onChange={(e)=>{updateLoginUser({...loginInfo,email:e.target.value})}}
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className=" text-white bg-black p-2"
                    onChange={(e)=>{updateLoginUser({...loginInfo,password:e.target.value})}}
                  />
                </div>
                   
                <div
                  className="flex  justify-center items-center mx-auto mt-4 p-2 text-white rounded-md bg-black hover:bg-black/10 "
                  style={{ }}
                >
                  <button type="submit">{ isLoginLoading?"Wait":"Login"}</button>
             
              
                </div>
                {loginError && (  <p className="bg-red-200 mt-2">{loginError}</p>)}
              
                {/* <button onClick={()=>toast.error("Enter correct passowrd")} type="button">HI</button> */}
                {/* {toast.error("Enter correct passowrd")} */}
              </div>
            </div>
          </form>
        </div>
        </>
      );
}

export default Login
