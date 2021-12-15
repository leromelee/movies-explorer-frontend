import Header from "../Header/Header";
import './Profile.css';
import React from 'react';

export default function Profile() {
  return (
    <>
      <Header />
      <main>
        <section className='profile'>
          <form className='form profile__form' name='form-profile' onSubmit={() => {}}>
            <h1 className='profile__form-head'>Привет, Михаил!</h1>
            <fieldset className='profile__form-inputs'>
              <label className='profile__form-lable'>Имя
                <input className='profile__form_input' name='name' type='text' placeholder={'Михаил'} required/>
              </label>
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
              <label className='profile__form-lable profile__form-lable_overline'>
                E&#8209;mail
                <input className='profile__form_input' name='email' type='email' placeholder={'pochta@yandex.ru'} required/>
              </label>
              <span className='form__input-error form__input-error_visible'>Что-то пошло не так...</span>
            </fieldset>
            <button className='button profile__button-edit' type='submit'>Редактировать</button>
          </form>
          <button className='button profile__button-exit' type='submit'>Выйти из аккаунта</button>
        </section>
      </main>
    </>
  )
}
