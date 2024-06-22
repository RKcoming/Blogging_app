import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import HomePage, { loader as postLoader } from "./pages/Home";
import { tokenLoader } from "./util/auth.js";
import PostDetailPage, { loader as PostDetailLoader } from "./pages/PostDetail";
import PostEditPage, {
  action as postEditAction,
} from "./pages/PostEdit";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import SigninPage, { action as signinAction } from "./pages/Signin";
import SignupPage, { action as signupAction } from "./pages/Signup";
import { loader as deleteLoader } from "./pages/Delete";
import { action as logoutAction } from "./pages/Logout";
import {AuthContextProvider} from "./auth-context/AuthContextProvider.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <Error />,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />, loader: postLoader },
      {
        path: "/post/:id",
        id: "post-detail",
        loader: PostDetailLoader,
        children: [
          {
            index: true,
            element: <PostDetailPage />,
          },
          { path: "edit", element: <PostEditPage />, action: postEditAction },
          { path: "delete", loader: deleteLoader },
        ],
      },
      {
        path: "new",
        element: <NewPostPage />,
        action: newPostAction,
      },
      {
        path: "signin",
        element: <SigninPage />,
        action: signinAction,
      },
      {
        path: "signup",
        element: <SignupPage />,
        action: signupAction,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);



function App() {
  return <AuthContextProvider> 
  <RouterProvider router={router} />  
  </AuthContextProvider>
}

export default App;
