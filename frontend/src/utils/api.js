class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Проверить ответ от сервера
  _handleResponse(res) {
    if (res.ok) return res.json();
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получить карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  //Добавить новую карточку места на сервер
  setNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link 
      }),
    }).then((res) => this._handleResponse(res));
  }

  //Удалить карточку места
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  //Поставить/удалить лайк карточке
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: !isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }


  //Получить данные пользователя
  getUserInfo() {
   return fetch(`${this._baseUrl}/users/me`, {
     method: "GET",
     headers: this._headers,
    }).then((res) => this._handleResponse(res));
 }

  //Отредактировать данные пользователя
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
       method: "PATCH",
       headers: this._headers,
       body: JSON.stringify({ 
        name: name, 
        about: about
      }),
    }).then((res) => this._handleResponse(res));
  }

   //Отредактировать аватар пользователя
   setProfileAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ 
        avatar: avatar
      }),
    }).then((res) => this._handleResponse(res));
  }

}

export const api = new Api({
  // baseUrl: 'http://localhost:3000',

  baseUrl: 'http://api.mesto.maribel.nomoredomains.club',
  headers: {
     "Content-Type": "application/json",
  },
});
