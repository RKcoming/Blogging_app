import {Outlet} from 'react-router-dom'
import MainNavigation from '../components/MainNavigation';

// import {jwtDecode} from "jwt-decode";
function RootLayout(){
  


  // const submit=useSubmit();
  // useEffect(()=>{
  //   if(!token) return;
  //   if(token==='EXPIRED'){
  //     return submit(null,{action:'/logout',method:'post'})
  //   }
  //   const duration=getTokenDuration();
  //   const timeOut=setTimeout(()=>{
  //     submit(null,{action:'/logout',method:'post'})
  //   },duration)
  //   return ()=>{
  //     clearTimeout(timeOut);
  //   }
  // },[token,submit])

  
  
  
  return <>
    <MainNavigation />
    <Outlet />
  </>
}
export default RootLayout;