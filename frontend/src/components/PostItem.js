import { useEffect, useState, useContext } from "react";
import classes from "./PostItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthContextProvider";
function PostItem(props) {
  const ctx = useContext(AuthContext);
  const isAuthenticated = ctx.token !== "EXPIRED";
  const navigate = useNavigate();
  const [disabled, setDisable] = useState(false);
  useEffect(() => {
    setDisable(false);
  }, []);
  async function deleteHandler() {
    const url = "http://localhost:8080/post/" + props.id;
    setDisable(true);
    const response = await fetch(url, {
      method: "delete",
      headers: {
        Authorization: ctx.token,
      },
    });
    setDisable(false);
    console.log(response);
    if (!response.ok) {
       return navigate('/error');
    } else {
      return navigate("/");
    }
  }
  return (
    <div className={classes.post_item}>
      <div className={classes.postData}>
        <p>
          Posted by {props.name} on {props.date}
        </p>
        <h1>{props.title}</h1>
      </div>
      <div className={classes.post_links}>
        <Link to={`/post/${props.id}`}>VIEW</Link>
        {isAuthenticated && <Link to={`/post/${props.id}/edit`}>EDIT</Link>}
        {isAuthenticated && (disabled ? (
          <Link>Deleting...</Link>
        ) : (
          <Link onClick={deleteHandler}>DELETE</Link>
        ))}
      </div>
    </div>
  );
}
export default PostItem;
