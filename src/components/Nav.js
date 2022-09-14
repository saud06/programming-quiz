import { Link } from 'react-router-dom';
import Account from "./Account";
import classes from "./styles/Nav.module.css";

export default function Nav(){
  return(
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <h3>Programming Quiz</h3>
          </Link>
        </li>
      </ul>

      <Account />
    </nav>
  );
}