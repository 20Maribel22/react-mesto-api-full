import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const card = props.card;
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `cards__button cards__button_type_del ${
    !isOwn ? "cards__button_type_del-inactive" : ""
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cards__button cards__button_type_like ${
    isLiked ? "cards__button_type_like-active" : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  function handleClick() {
    props.onCardClick(card);
  }

  return (
    <li className="cards__item">
      <img
        onClick={handleClick}
        className="cards__image"
        src={props.src}
        alt={props.title}
      />
      <div className="cards__description">
        <h2 className="cards__title">{props.title}</h2>
        <div className="cards__like-gpoup">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          ></button>
          <span className="cards__like-number">{props.like.length}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        title="Удалить карточку"
      ></button>
    </li>
  );
}

export default Card;
