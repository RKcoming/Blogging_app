import Login from "../components/Login";
import { redirect } from "react-router-dom";

function SignupPage() {
  return <Login login={false} />;
}
export default SignupPage;

export async function action({ request }) {
  const formData = await request.formData();

  const authData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const response = await fetch("http://localhost:8080/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  if (!response.ok) {
    if(response.status===422) return response;
    throw response;
  }
  return redirect("/signin");
}
