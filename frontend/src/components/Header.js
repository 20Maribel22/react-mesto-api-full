import logo from "../images/header-logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div>
        {props.loggedIn ? (
          <div className="header__wrap">
            <p className="header__email">{props.userEmail}</p>
            <Link className="header__sign-out" to="" onClick={props.onLogout}>
              Выйти
            </Link>
          </div>
        ) : (
          <Link
            to={`${location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`}
            className="header__link"
          >
            {`${location.pathname === "/sign-in" ? "Регистрация" : "Войти"}`}
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;
