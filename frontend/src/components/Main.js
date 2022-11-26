import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const cards = props.cards;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__image"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__description">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button profile__button_type_edit"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button profile__button_type_add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
              card={card}
              key={card._id}
              src={card.link}
              title={card.name}
              like={card.likes}
              owner={card.owner}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
