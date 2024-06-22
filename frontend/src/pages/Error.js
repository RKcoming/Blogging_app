import { useRouteError,useNavigate} from "react-router-dom";
import { useEffect } from "react";
function Error(){
   const error=useRouteError();
   console.log(error);
   const navigate=useNavigate();
   useEffect(()=>{
    if(error?.status===401) navigate('/signin');  
   })
   
   let title='An error occured';
   let message='Something went wrong!';
   if(error?.data?.title){
    title=error.data.title;
   }
   if(error?.data?.message){
    message=error.data.message;
   }
   
   if(error?.status===404){
     title="Not found!";
     message="Could not found resource or Page";
   }
   return (
    <>
    <h1>{title}</h1>
    <p>{message}</p>
    </>
    
   )
}
export default Error;