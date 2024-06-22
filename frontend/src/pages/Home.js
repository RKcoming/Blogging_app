import { useLoaderData } from "react-router-dom";
import { useContext,useEffect } from "react";
import PostList from "../components/PostList";
import { AuthContext } from '../auth-context/AuthContextProvider';


// const DUMMY_ITEMS = [
//   {
//     id: 1,
//     name: "Rajesh",
//     title: "Good one",
//     image: "",
//     content:
//       "World crushes the weak one,so be strong enough to face this cruel world",
//     data: new Date(),
//   },
//   {
//     id: 2,
//     name: "Rohit",
//     title: "Another one",
//     image: "",
//     content:
//       "World crushes the weak one,so be strong enough to face this cruel world",
//     data: new Date(),
//   },
//   {
//     id: 3,
//     name: "Amit",
//     title: "Third one",
//     image: "",
//     content:
//       "World crushes the weak one,so be strong enough to face this cruel world",
//     data: new Date(),
//   },
// ];
function HomePage() {
  const ctx=useContext(AuthContext);
  useEffect(()=>{
    console.log("useEffect runnig");
    ctx.signinHandler();
  },[ctx]);
  
  let data = useLoaderData();

  data = data.posts.map((d) => ({
    id: d._id,
    title: d.title,
    image: d.image,
    name: d.userId.username,
    content: d.content,
    date: d.createdAt.substr(0, 10),
  }));

  return <PostList posts={data} />;
}
export default HomePage;

export async function loader() {
  const response = await fetch("http://localhost:8080", {
    method:'get',
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (!response.ok) {
    throw response;
  }

  return response;
}
