import { createContext, useCallback, useEffect, useState } from "react";
import { baseURL, postRequest } from "../utils/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //main user
  const [user, setUser] = useState(null);

  //incase any error from backend
  const [registerError, setRegisterError] = useState(null);

  //if loading display Creating account else Register
  const [isRegisterLoading, setRegisterLoading] = useState(false);

  //main data for registering User
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log("registerInfo", registerInfo);
  console.log("user", user);

  //login user

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  console.log("loginINfo", loginInfo);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user)); //convert string to json
  }, []);

  // this is for setting values of reisterinfo with change in input
  const updateUserInfo = useCallback(
    (info) => {
      setRegisterInfo(info);
    },
    [registerInfo]
  );

  //register user
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault(); // avoid auto submit
      setRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseURL}/user/register`,
        JSON.stringify(registerInfo)
      );
      console.log(response);
      setRegisterLoading(false);
      if (response.error) {
        console.log("error on getting response");
        return setRegisterError(response.msg);
      }

      localStorage.setItem("user", JSON.stringify(response));
      setUser(response.user);
    },
    [registerInfo]
  );

  //logout
  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  //LOGIN

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      const response = await postRequest(
        `${baseURL}/user/login`,
        JSON.stringify(loginInfo)
      );
      console.log("response", response);
      setIsLoginLoading(false);
      if (response.error) return setLoginError(response.msg);

      setLoginError(null);
      localStorage.setItem("token", JSON.stringify(response.token));
      setUser(response);
    },
    [loginInfo]
  );
  const updateLoginUser = useCallback((info) => {
    setLoginInfo(info);
  }, loginInfo);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateUserInfo,
        registerError,
        registerUser,
        isRegisterLoading,
        logoutUser,
        loginUser,
        updateLoginUser,
        loginError,
        loginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
