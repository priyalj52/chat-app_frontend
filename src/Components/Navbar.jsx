import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Notifications";
import { useScrollTrigger } from "@mui/material";
import { IoIosConstruct, IoIosSunny, IoMdContract } from "react-icons/io";
import { MdModeNight } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import "../utils/styles.css"
import icon from "../assets/icon.png"

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="bg-black/20 flex justify-between items-center p-4">
      <div className="flex items-center justify-center">
        <Link to="/" >Chat App
       
        </Link>
        <img src={icon} alt="" srcset="" width={'40px'} />
      </div>

      {user && <div >Logged in as <span className="font-extrabold capitalize">{user?.user?.name || user?.userName}</span></div>}

      <div className="flex gap-8 items-center justify-center">
        <Notifications />
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

        <div className="flex items-center">
          {theme === 'light' ? (
            <>
              <BsSun size={24} color="#FFD700" />
              <label className="switch">
                <input type="checkbox" onChange={toggleTheme} />
                <span className="slider round"></span>
              </label>
              <BsMoon size={24} color="#708090" />
            </>
          ) : (
            <>
              <IoIosSunny size={24} color="#FFD700" />
              <label className="switch">
                <input type="checkbox" onChange={toggleTheme} />
                <span className="slider round"></span>
              </label>
              <MdModeNight size={24} color="#708090" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
