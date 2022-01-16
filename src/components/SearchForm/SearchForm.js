import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';

function SearchForm({
  isChecked,
  searchMovies,
  handleCkecked,
}) {

  const {
    values,
    errorMessages,
    isValid,
    handleInputChange,
  } =  useFormValidation({});

   const handleSubmit = (evt) => {
    evt.preventDefault();
    searchMovies(values.search, isChecked);
  }

  return (
    <section className="search">
      <form className='form search-form' name='search-form' onSubmit={handleSubmit}>
        <fieldset className='search-form__container'>
          <input
            className={`search-form__input ${errorMessages.search ? "search__form-input_type_error" : ""}`}
            type="search"
            name="search"
            placeholder="Фильм"
            onChange={handleInputChange}
            value={values.search || ''}
            autoComplete="off"
            required
           />
           {isValid ? '' : <div className="search__form-error">{errorMessages.search}</div>}
          <button className='button form__button-submit' type='submit'></button>
        </fieldset>

        <FilterCheckbox filterHandler={handleCkecked}/>

      </form>
    </section>
  )
}

export default SearchForm;
