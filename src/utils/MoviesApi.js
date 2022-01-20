import { optionsMovieApi } from './utils';

class MovieApi {
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

  getMovies() {
    return fetch(`${this._url}`, {
      headers: {
        ...this._headers,
      }
    })
    .then(this._checkResponse);
  }

}

const movieApi = new MovieApi(optionsMovieApi);

export default movieApi;
