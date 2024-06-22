import React,{useState} from 'react';
import { jwtDecode } from 'jwt-decode';
export const AuthContext=React.createContext({
    token:'EXPIRED',
    username:null,
    logoutHandler:()=>{},
    signinHandler:()=>{}
});
function getTokenDuration(){
    const storedExpirationDate=localStorage.getItem('expiration');
    const expirationDate=new Date(storedExpirationDate);
    const duration=expirationDate.getTime()-Date.now();
    return duration;
  }
  function tokenLoader(){
    const token=localStorage.getItem('token');
    const duration=getTokenDuration();
    if(!token || duration<0) return 'EXPIRED'
    return token;
  }
  function logout(){
    console.log('logout action')
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  
export const AuthContextProvider=(props)=>{
    const [token,setToken]=useState(tokenLoader());
    const logoutHandler=()=>{
        logout();
        setToken(tokenLoader());
    }
    const signinHandler=()=>{
      setToken(tokenLoader());
    }
    const getUser=()=>{
      if(!token) return null;
      else{
        try{
          return jwtDecode(token);
        }catch(e){
          return null;
        }
         
      }
    }
    return(
        <AuthContext.Provider
        value={{token,username:getUser(),logoutHandler,signinHandler}}>
        {props.children}
        </AuthContext.Provider>
    )
}
