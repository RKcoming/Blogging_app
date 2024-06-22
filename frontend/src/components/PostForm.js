import { Form,useActionData,useNavigate,useNavigation } from "react-router-dom";
import classes from './PostForm.module.css';
function PostForm({ method, post }) {
   const data=useActionData();
   const navigation=useNavigation();
   const isSubmitting=navigation.state==='submitting';
   const navigate=useNavigate();
   function cancelHandler(){
    navigate(-1);
   }
  return (
    <Form method={method} className={classes.form} encType="multipart/form-data">
      {data && <p style={{color:'red'}}>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={post ? post.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          name="image"
          required
          // defaultValue={post ? post.image : ""}
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          required
          defaultValue={post ? post.content : ""}
        />
      </p>
      <div className={classes.actions}>
        <button className="btn" type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button className="btn" type='submit' disabled={isSubmitting}>{isSubmitting?'Submitting..':'Save'}</button>
      </div>
    </Form>
  );
}
export default PostForm;
