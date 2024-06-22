import { redirect } from "react-router-dom";
import PostForm from "../components/PostForm";

function NewPostPage(){
    return <PostForm method="POST" />;
}
export default NewPostPage;

export async function action({request}){
    const data=await request.formData();
   
    const formData=new FormData();
    formData.append('title',data.get('title'));
    formData.append('content',data.get('content'));
    formData.append('image',data.get('image'));
    formData.append('userId','64f6b2c83a1897adbe37d2ff');
    const response=await fetch("http://localhost:8080/new", {
        method: "post",
        body: formData,
        headers: {
            Authorization: localStorage.getItem("token"),
        }
      });

    if(!response.ok){
        if(response.status===422) return response;
        throw response;
    }
    return redirect('/');
}