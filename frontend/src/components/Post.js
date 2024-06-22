import { useEffect ,useContext,useState} from 'react';
import classes from './Post.module.css';
import { AuthContext } from '../auth-context/AuthContextProvider';

function Post(props){
  const  ctx=useContext(AuthContext);
  // const [imageString,setImageString]=useState("");
  // const getBase64Image = async res => {
  //   const blob = await res.blob();

  //   const reader = new FileReader();

  //   await new Promise((resolve, reject) => {
  //     reader.onload = resolve;
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  //   return reader.result;
  // };
  // useEffect(()=>{
  //   const url=`http://localhost:8080/${props.postData.post.image}`
  //   console.log(url);
  //   fetch(url,
  //   { method:"get",
  //     headers: {
  //       Authorization:ctx.token,
  //     }
  //   }).then(getBase64Image).then(imageStr=>{
  //     setImageString(imageStr);
  //   })
  // },[])
  
  return (
    <div className={classes.post}>
        <h1>{props.postData.post.title}</h1>
        <img src={`http://localhost:8080/${props.postData.post.image}`} alt={props.postData.post.title} height={200} width={200}/>
        <p>{props.postData.post.content}</p>
    </div>
  ) 

}
export default Post;