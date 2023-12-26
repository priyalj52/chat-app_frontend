import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="bg-black/20 flex justify-between items-center p-4 ">
      {/* pehla  */}
      <div>
        <Link to="/">Chat App</Link>
      </div>
      {/* dosrra */}
      {user && <div>Logged in as {user?.user?.name || user?.userName}</div>}

 
      {/* teesra */}
     
      <div className="flex gap-8 items-center justify-center">
      <Notifications/>
        {user && (
          <Link to="/login" onClick={() => logoutUser()}>
                
            <span>Logout</span>
          </Link>
        )}
     
        {!user && (
          <>
            <Link to="/Register">
              <span>Signup</span>
            </Link>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
