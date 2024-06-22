import { useRouteLoaderData } from "react-router-dom";
import Post from "../components/Post";

function PostDetailPage(){
    const data=useRouteLoaderData('post-detail');
    return <Post postData={data} />
    
}
export default PostDetailPage;

export async function loader({request,params}){
    // console.log('executing post detail');
    const id=params.id;
    const url='http://localhost:8080/post/'+id;
    const response=await fetch(url,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    });
    
    if(!response.ok) {
        throw response;
    }
    return response;
}