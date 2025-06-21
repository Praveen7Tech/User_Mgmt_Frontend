// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user.userinfo);

  const userId = user?._id;

  const fetchUserData = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:3003/api/user/getUserData/${userId}`);
      console.log("cc",res.data)
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = () => {
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userData, refreshUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUserContext = () => useContext(UserContext);
