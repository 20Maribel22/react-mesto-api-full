import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onRegister(email, password);
  }

  return (
    <div className="info info__type_register">
      <h2 className="info__title">Регистрация</h2>
      <form className="form" name="login" onSubmit={handleSubmit}>
        <input
          className="form__input"
          name="email"
          type="email"
          value={email || ""}
          onChange={handleChangeEmail}
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
        />
        <input
          className="form__input"
          name="password"
          type="password"
          value={password || ""}
          onChange={handleChangePassword}
          placeholder="Пароль"
          minLength="8"
          maxLength="200"
          required
        />
        <button className="form__save-button">Зарегистрироваться</button>
      </form>
      <Link className="info__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;