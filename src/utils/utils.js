export const optionsMainApi = {
  url: "https://api.diplomaleromelee.nomoredomains.rocks",
  headers: {
    'Content-Type': 'application/json'
  }
}

export const optionsMovieApi = {
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    'Content-Type': 'application/json'
  }
};

export const siteMenuItems = [
  {
    title: 'Фильмы',
    link: '/movies',
    id: 1
  },
  {
    title: 'Сохраненные фильмы',
    link: '/saved-movies',
    id: 2
  }
]
