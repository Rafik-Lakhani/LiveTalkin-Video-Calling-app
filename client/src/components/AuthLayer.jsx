import React,{useEffect,useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice.js";

function AuthLayer({ children }) {
  const [isLoading,setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUserLogin = async () => {
      if (localStorage.getItem("token")) {
        console.log("api call");
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_USER_API_KEY}/getprofile`,
            {
              headers: { Authorization: `${localStorage.getItem("token")}` },
            }
          );
          if (response.status === 200) {
            console.log("User data:", response.data.user);
            dispatch(login(response.data.user));
            setIsLoading(false);
          } else {
            console.log(response);
            localStorage.removeItem("token");
            setIsLoading(false);
          }
        } catch (error) {
          localStorage.removeItem("token");
          console.log(error);
          setIsLoading(false);
        }
      }
      else{
        setIsLoading(false);
      }
    };
    checkUserLogin();
  }, [dispatch]);
  return ( isLoading ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-100"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
        </div>
        <h1 className="mt-4 text-xl font-semibold text-blue-100 text-center">Loading...</h1>
        {isLoading}
      </div>
    </div>
  ) : (children) );
}

export default AuthLayer;
