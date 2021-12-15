import { Link } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import Header from '../Header/Header';
import './Login.css';
import React from 'react';

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <section className='login'>
          <form className='form login__form' name='form-login' onSubmit={() => {}}>
            <h1 className='form__head-auth'>Рады видеть!</h1>
            <label className='form__label-auth'>E-mail
              <input className='form__input-auth' name='email' type='email' required/>
              <span className='form__input-error'>Что-то пошло не так...</span>
            </label>
            <label className='form__label-auth'>Пароль
              <input className='form__input-auth' name='password' type='password' minLength={8} maxLength={15} required/>
              <span className='form__input-error'>Что-то пошло не так...</span>
            </label>
            <button className='button form__button-auth form__button-auth_offset' type='submit'>Войти</button>
          </form>
          <div className='login__sign-in'>
            <p className='login__question'>Ещё не зарегистрированы?</p>
            <Link className='link login__link' to={appRoutes.signUp}>
              Регистрация
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
