import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import classes from "./Login.module.css";

function Login({login}) {
  const response=useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }
  return (
    <Form method="POST"  className={classes.login_form}>
      {response && <p style={{color:'red'}}>{response.message}</p>}
      <p>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" />
      </p>
      {!login && <p>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="text" id="confirmPassword" name="confirmPassword" />
      </p>}
      <div className={classes.action}>
        <button
          className="btn"
          type="button"
          onClick={cancelHandler}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting?'Submitting':login?'Submit':'Save'}
        </button>
      </div>
    </Form>
  );
}
export default Login;
