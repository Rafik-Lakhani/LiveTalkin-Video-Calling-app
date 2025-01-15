import React,{useEffect} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice.js";

function AuthLayer({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUserLogin = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_USER_API_KEY}/getprofile`,
            {
              headers: { Authorization: `${localStorage.getItem("token")}` },
            }
          );
          if (response.status === 200) {
            dispatch(login(response.data.user));
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
    };
    checkUserLogin();
  }, []);
  return ( children );
}

export default AuthLayer;
