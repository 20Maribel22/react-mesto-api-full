import success from '../images/success.png';
import error from '../images/error.png';

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_item_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__item_image"
          src={props.status ? success : error}
          alt={props.status ? "Успешно" : "Ошибка"}
        />
        <p className="popup__item_text">
          {props.status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;