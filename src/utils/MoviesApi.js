const beatfilmApi = 'https://api.nomoreparties.co/beatfilm-movies';

const fixPromise = (res) => (
  res.ok ? res.json()
    : Promise.reject(`Произошла ошибка ${res.status}: ${res.statusText}`)
);

export const getMovies = () => fetch(`${beatfilmApi}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then((res) => fixPromise(res));