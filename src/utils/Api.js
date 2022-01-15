class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error(`Response is not ok with status ${res.status}`);
        }
    }

    _putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers})
        .then(this._checkResponse);
    }

    _removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
        .then(this._checkResponse);
    }

    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
        .then(this._checkResponse);
    }

    setUserInformation(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH", 
            headers: this._headers, 
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse);
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      });
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: data.link})
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, status) {
        return status ? this._putLike(cardId) : this._removeLike(cardId);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
      authorization: 'cf50944a-ccaa-46b0-8cc3-ef5baa3fd45f',
      'Content-Type': 'application/json'
    }
});

export default api;