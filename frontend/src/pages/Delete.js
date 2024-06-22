import { redirect } from "react-router-dom";

export async function loader({params}){
    console.log('executin header problem');
    const id=params.id;
    const url='http://localhost:8080/post/'+id;
    const response=await fetch(url,{
        method:'delete',
        headers: {
            Authorization: localStorage.getItem("token"),
        }
    });
    
    if(!response.ok) throw response;
    return redirect('/');
}
