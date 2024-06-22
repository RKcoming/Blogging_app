import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import { Link} from "react-router-dom";
import { AuthContext } from "../auth-context/AuthContextProvider";
import { useContext } from "react";
function PostList(props) {
  const ctx=useContext(AuthContext);
  const isAuthenticated = ctx.token !== "EXPIRED";
  return (
    <div>
      {isAuthenticated && (
        <Link to="/new" className={classes.new_post}>
          Add post
        </Link>
      )}
      <ul className={classes.posts}>
        {props.posts.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>No post yet</h1>
        ) : (
          props.posts.map((post) => (
            <li key={post.id}>
              <PostItem
                id={post.id}
                name={post.name}
                title={post.title}
                image={post.image}
                content={post.content}
                date={post.date}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
export default PostList;
