import React from "react";
import  { SHORT_MOVIE_DURATION } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard({
  savedMoviesPage,
  movie,
  handleMovieSave,
  handleMovieTest,
  image,
  link,
  deleteMovie
}) {

const isAdded = handleMovieTest(movie)

function movieDuration() {
  if(movie.duration <= SHORT_MOVIE_DURATION) {
    return `${movie.duration} мин`;
  } else {
    return `${Math.floor(movie.duration / SHORT_MOVIE_DURATION).toString()} ч ${Math.round((movie.duration % SHORT_MOVIE_DURATION) * 0.6666).toString()} мин`
  }
};

function handleFilmSave() {
  handleMovieSave(movie);
}

function handleFilmDelete() {
  deleteMovie(movie, savedMoviesPage);
}

  return (
    <>
      <div className="cards__container">
        <div className="cards__info">
        <h3 className="cards__title">{movie.nameRU}</h3>
        <p className="card__duration">
          {movieDuration()}
        </p>
        </div>
      {savedMoviesPage ? (
        <button className="button cards__button-delete" onClick={handleFilmDelete}></button>
        ) : (
         (!isAdded ? <button className="button cards__button-like" onClick={handleFilmSave}></button> : <button className="button cards__button-like_active" onClick={handleFilmDelete}></button> )
      )}
      </div>
      <a className="movies__link" href={link} target="_blank" rel="noreferrer">
        <img className="cards__poster" src={image} alt={movie.nameRU} />
      </a>
      </>
  )
}

export default MoviesCard;
