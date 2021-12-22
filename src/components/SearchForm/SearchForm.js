import React, { useState } from 'react';

import './SearchForm.css';

import Checkbox from '../Checkbox/Checkbox';

export default function SearchForm({
  checkboxOn,
  handleToggleCheckbox,
  onSearchMoviesByValue,
  onSearchSavedMoviesByValue,
  pageSavedMovies,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchValidity, setSearchValidity] = useState(false);

  const handleChangeSearchValue = (evt) => {
    if (!evt.target.validity) {
      setSearchValidity(false);
    } else {
      setSearchValidity(true);
    }

    setSearchValue(evt.target.value);
  };

  const handleSearchMovies = (evt) => {
    evt.preventDefault();
    onSearchMoviesByValue(searchValue);
  };

  const handleSearchSavedMovies = (evt) => {
    evt.preventDefault();
    onSearchSavedMoviesByValue(searchValue);
  };

  return (
    <section className='search'>
      <form className='form search-form' name='search-form'
            onSubmit={pageSavedMovies ? handleSearchSavedMovies : handleSearchMovies}>
        <fieldset className='search-form__container'>
          <input className='search-form__input' name='movie' type='text'
                 placeholder='Фильм'
                 onChange={handleChangeSearchValue}
                 value={searchValue || ''}
                 required />
          <button className='button form__button-submit' type='submit'/>
        </fieldset>
        <Checkbox
          checkboxOn={checkboxOn}
          handleToggleCheckbox={handleToggleCheckbox}
        />
      </form>
    </section>
  );
}