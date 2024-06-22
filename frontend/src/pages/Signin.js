import { redirect } from "react-router-dom";
import Login from "../components/Login";
function SigninPage(){
    return <Login login={true}/>
}
export default SigninPage;

export async function action({ request }) {
    const formData = await request.formData();
  
    const authData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    const response = await fetch("http://localhost:8080/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    });
  
    if (!response.ok) {
      if(response.status===422 || response.status===401) return response;
      throw response;
    }
    const resData=await response.json();
    localStorage.setItem('token',resData.token);
    const expiration=new Date();
    expiration.setHours(expiration.getMinutes()+1);
    
    localStorage.setItem('expiration',expiration.toISOString());
    return redirect('/');
  }
  