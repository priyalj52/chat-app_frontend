// import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "./Pages/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Main } from "./Pages/Main";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <ChatContextProvider user={user}>
        <Routes>
          {/* if user exists means has logged in then only show chat page  */}
          <Route path="/" element={user ? <Main /> : <Login />} />
          <Route path="/login" element={user ? <Main /> : <Login />} />
          <Route path="/register" element={user ? <Main /> : <Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ChatContextProvider>
    </>
  );
}

export default App;
