import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      text="Сохранить"
    >
      <label className="popup__field">
        <input
          ref={inputRef}
          type="url"
          className="popup__item popup__item_type_link"
          id="avatar-item"
          name="avatar"
          placeholder="Ссылка на картинку"
          pattern="https://.*"
          required
        />
        <span className="popup__item-error avatar-item-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
