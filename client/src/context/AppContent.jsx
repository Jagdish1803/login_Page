import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

  axios.defaults.withCredentials=true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const[isLoggedin,setisLoggedin]=useState(false)
  const[UserData,setUserData]=useState(false)


  const getAuthState= async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
      if(data.success){
        setisLoggedin(true)
        getUserData()
      }
      else{

      }
        } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserData = async()=>{
    try {
      const{data} = await axios.get(backendUrl+ '/api/user/data')
      
      data.success ? setUserData(data.userData) : toast.error(data.message)
     
    } catch (error) {
      toast.error(data.message)
    }
  }
  useEffect(()=>{
    getAuthState();
  },[])
  const value = {
    backendUrl,
    isLoggedin,setisLoggedin,
    UserData,setUserData,
    getUserData
  };

  return (
   
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
