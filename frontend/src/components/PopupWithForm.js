function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_theme_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form
          name={props.name}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button-save">
            {props.text}
          </button>
        </form>
        <button
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
export default PopupWithForm;
