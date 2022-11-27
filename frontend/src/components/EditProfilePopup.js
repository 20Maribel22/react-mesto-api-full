import { useContext, useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeAbout(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      text="Сохранить"
    >
      <label className="popup__field">
        <input
          onChange={handleChangeName}
          value={name}
          type="text"
          className="popup__item popup__item_type_name"
          id="name-item"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__item-error name-item-error"></span>
      </label>
      <label className="popup__field">
        <input
          onChange={handleChangeAbout}
          value={about}
          type="text"
          className="popup__item popup__item_type_info"
          id="job-item"
          name="job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__item-error job-item-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
