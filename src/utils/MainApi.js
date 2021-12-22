export const URL = 'https://api.diplomaleromelee.nomoredomains.rocks';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const fixPromise = (res) => (
  res.ok ? res.json()
    : Promise.reject(`Произошла ошибка ${res.status}: ${res.statusText}`)
);

export const register = ({ name, password, email }) => fetch(`${URL}/signup`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    name, password, email,
  }),
})
  .then((res) => fixPromise(res));

export const signin = ({ password, email }) => fetch(`${URL}/signin`, {
  method: 'POST',
  headers,
  body: JSON.stringify({
    password, email,
  }),
})
  .then((res) => fixPromise(res));

export const getUserInfo = (token) => fetch(`${URL}/users/me`, {
  method: 'GET',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => fixPromise(res));


export const editUserInfo = (token, { name, email }) => fetch(`${URL}/users/me`, {
  method: 'PATCH',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    name, email,
  }),
})
  .then((res) => fixPromise(res));

export const getSavedMovies = (token) => fetch(`${URL}/movies`, {
  method: 'GET',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => fixPromise(res));

export const saveMovie = (token, movie) => fetch(`${URL}/movies`, {
  method: 'POST',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: movie.image,
    trailer: movie.trailer,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    thumbnail: movie.thumbnail,
    movieId: movie.movieId,
  }),
})
  .then((res) => fixPromise(res));

export const deleteMovie = (token, movieId) => fetch(`${URL}/movies/${movieId}`, {
  method: 'DELETE',
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => fixPromise(res));
