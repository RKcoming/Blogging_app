import { useRouteLoaderData,redirect } from "react-router-dom";
import PostForm from "../components/PostForm";

function PostEditPage() {
  const data = useRouteLoaderData("post-detail");
  
  return <PostForm method="PATCH" post={data.post} />;
}
export default PostEditPage;

export async function action({ request,params }) {
  const formData = await request.formData();
  const id=params.id;
  const newPostData = {
    title: formData.get("title"),
    image: formData.get("image"),
    content: formData.get("content"),
  };
  const url='http://localhost:8080/post/'+id+'/edit';
  const response = await fetch(url, {
    method: request.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPostData),
  });
  console.log(response);

  if (!response.ok) {
    if (response.status === 422) return response;
    throw response;
  }
  return redirect("/");
}
