import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

const UserState = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:5000/user/profile", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setReady(true);
        })
        .catch((error) => {
          setReady(true);
          console.log(error);
          const message = error?.response?.data.Message || "Please Login first";
          alert(message);
          navigate("/login");
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {" "}
      {props.children}{" "}
    </UserContext.Provider>
  );
};
export default UserState;
