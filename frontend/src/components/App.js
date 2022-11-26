import "../pages/index.css";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isConfirmPopupOpen, handleConfirmClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user.data);
          setCards(cards.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    auth
      .getContent()
      .then((data) => {
        setUserEmail(data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  function handleUpdateUser(data) {
    api
      .setUserInfo({
        name: data.name,
        about: data.about,
      })
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setProfileAvatar({ avatar: data.avatar })
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .setNewCard({
        name: data.name,
        link: data.link,
      })
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((res) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? res.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    handleConfirmClick(false);
    setSelectedCard({});
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setStatus(true);
          setIsInfoTooltipPopupOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setStatus(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
          setUserEmail(data.email);
          setLoggedIn(true);
          history.push("/");
      })
      .catch((err) => {
        setStatus(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    setUserEmail("");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          cards={cards}
          handleCardDelete={handleCardDelete}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>
        <ProtectedRoute exact path="/" component={Footer} loggedIn={loggedIn} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          text="Да"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={status}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
