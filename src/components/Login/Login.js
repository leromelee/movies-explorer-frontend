import React from 'react';
import {Link} from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';
import  { FORM_EMAIL_PATTERN } from '../../utils/constants';
import './Login.css';

function Login(props) {
  const handleLogin = props.handleLogin;
  const {
    values,
    errorMessages,
    isValid,
    handleInputChange,
    reset
  } =  useFormValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values.email, values.password);
    reset();
  }

    return (
        <>
        <section className="login">
          <div className="login__container">
            <Logo />
            <AuthForm
              title="Рады видеть!"
              name="login"
              submitBtnText="Войти"
              onSubmit={handleSubmit}
              isValid={isValid}
              values={values}
            >
              {props.isLoading && <div className="form__loader"><Preloader /></div>}
              <fieldset className="form__fields">

                  <label className="form__label" htmlFor="email">E-mail</label>
                  <input
                    className={`form__input ${errorMessages.email ? "form__input_type_error" : ""}`}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    pattern={FORM_EMAIL_PATTERN}
                    id="email"
                    value={values.email || ''}
                    autoComplete="off"
                    minLength="2"
                    required
                  />
                  {isValid ? '' : <div className="form-profile__error">{errorMessages.email}</div>}


                  <label className="form__label" htmlFor="password">Пароль</label>
                  <input
                    className={`form__input ${errorMessages.password ? "form__input_type_error" : ""}`}
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    minLength="2"
                    value={values.password || ''}
                    autoComplete="off"
                    required
                  />
                  {isValid ? '' : <div className="form-profile__error">{errorMessages.password}</div>}
              </fieldset>
              {props.formAuthError && <Error>{props.formAuthError}</Error>}
            </AuthForm>
            <p className="login__subtitle">Еще не зарегистрированы?
              <Link className="login__link" to="/signup"> Регистрация</Link>
            </p>
          </div>
        </section>
       </>
    )
}

export default Login;
