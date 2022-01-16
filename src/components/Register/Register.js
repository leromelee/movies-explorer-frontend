import React from 'react';
import {Link} from 'react-router-dom';

// Импорт компонентов
import useFormValidation from '../../hooks/useFormValidation';
import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';
import { FORM_NAME_PATTERN, FORM_EMAIL_PATTERN } from '../../utils/constants';
import './Register.css';

function Register(props) {
  const handleRegister = props.handleRegister;
  const {
    values,
    errorMessages,
    isValid,
    handleInputChange,
    reset
  } =  useFormValidation({});
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(values.name, values.email, values.password);
    reset();
  }

    return (
        <>
        <section className="register">
          <div className="register__container">
            <Logo />
            <AuthForm
              title="Добро пожаловать!"
              name="register"
              submitBtnText="Зарегистрироваться"
              onSubmit={handleSubmit}
              isValid={isValid}
              values={values}
            >
            {props.isLoading && <div className="form__loader"><Preloader /></div>}
              <fieldset className="form__fields">
                  <label className="form__label" htmlFor="name">Имя</label>
                  <input
                    className={`form__input ${errorMessages.name ? "form__input_type_error" : ""}`}
                    onChange={handleInputChange}
                    name="name"
                    type="text"
                    placeholder="Имя"
                    id="name"
                    pattern={FORM_NAME_PATTERN}
                    value={values.name || ''}
                    autoComplete="off"
                    minLength="2"
                    maxLength="30"
                    required
                  />
                  {isValid ? '' : <div className="form-profile__error">{errorMessages.name}</div>}

                  <label className="form__label" htmlFor="email">E-mail</label>
                  <input
                    className={`form__input ${errorMessages.email ? "form__input_type_error" : ""}`}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    id="email"
                    pattern={FORM_EMAIL_PATTERN}
                    value={values.email || ''}
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
                    value={values.password || ''}
                    minLength="2"
                    required
                    autoComplete="off"
                  />
                  {isValid ? '' : <div className="form-profile__error">{errorMessages.password}</div>}
              </fieldset>
              {props.formRegisterError && <Error>{props.formRegisterError}</Error>}
            </AuthForm>
            <p className="register__subtitle">Уже зарегистрированы?
              <Link className="register__link" to="/signin"> Войти</Link>
            </p>
          </div>
        </section>
       </>
    )
}

export default Register;
