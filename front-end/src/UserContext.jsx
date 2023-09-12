import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      const response = await axios.get("/profile");
      setUsername(response.data.username);
      setUserId(response.data.userId);
    }
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
