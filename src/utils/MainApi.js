import { optionsMainApi } from './utils';
import { MOVIES_IMAGES } from '../utils/constants';

class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  checkToken = (token) => {
    return fetch(`${optionsMainApi.url}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  };

  register = (name, email, password) => {
    return fetch(`${optionsMainApi.url}/signup`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    .then(this._checkResponse)
  };

  login = (email, password) => {
    return fetch(`${optionsMainApi.url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password }),
    })
    .then(this._checkResponse)
  };


  getInitialProfile() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      headers: {
        ...this._headers,
        'authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse);
  }

  editProfile(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  getMovies() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

  saveMovie(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country || " ",
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${MOVIES_IMAGES}${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `${MOVIES_IMAGES}${data.image.formats.thumbnail.url}` ,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,

      }),
    })
      .then(this._checkResponse);
  }

  deleteMovie(deletedItem) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/movies/${deletedItem._id}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

}

const mainApi = new MainApi(optionsMainApi);

export default mainApi;
