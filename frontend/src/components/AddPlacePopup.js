import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangePlace(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      text="Создать"
    >
      <label className="popup__field">
        <input
          onChange={handleChangePlace}
          value={name}
          type="text"
          className="popup__item popup__item_type_newname"
          id="newname-item"
          name="newname"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__item-error newname-item-error"></span>
      </label>
      <label className="popup__field">
        <input
          onChange={handleChangeLink}
          value={link}
          type="url"
          className="popup__item popup__item_type_link"
          id="link-item"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__item-error link-item-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
