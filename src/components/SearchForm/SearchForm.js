import './SearchForm.css';
import React from 'react';

export default function SearchForm() {
  return (
    <section className='search'>
      <form className='form search-form' name='search-form' onSubmit={() => {}}>
        <fieldset className='search-form__container'>
          <input className='search-form__input' name='movie' type='text' placeholder='Фильм' required />
          <button className='button form__button-submit' type='submit'/>
        </fieldset>
        <label className='search-form__switcher-label'>
          <input className='search-form__switcher' name='short-movie'
                 type='checkbox' defaultChecked />Короткометражки</label>
      </form>
    </section>
  );
}
