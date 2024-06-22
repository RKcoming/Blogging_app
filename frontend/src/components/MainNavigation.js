import classes from "./MainNavigation.module.css";
import { NavLink, useSubmit } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthContextProvider";
import { useContext } from "react";
function MainNavigation() {
  const ctx=useContext(AuthContext);
  const isAuthenticated = ctx.token !== "EXPIRED";
  const submit=useSubmit();
  function logoutHandler(){
    ctx.logoutHandler();
    submit(null,{action:'/logout',method:'post'});
  }
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink to="/">Twinng</NavLink>
          </li>
        </ul>
        {!isAuthenticated ? (
          <ul className={classes.user}>
            <li>
              <NavLink to="/signin">Signin</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
        ) : (
          <ul className={classes.user}>
            <li>
              <NavLink onClick={logoutHandler}>Logout</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
export default MainNavigation;
