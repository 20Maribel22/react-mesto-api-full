function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div
      className={`popup popup_theme_image ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__button-close popup__button-close_theme_image"
          onClick={onClose}
        />
        <div className="popup__description">
          <img src={card.link} className="popup__photo" alt={card.name} />
          <h3 className="popup__photo-title">{card.name}</h3>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;
