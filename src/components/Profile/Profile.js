import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

// Импорт компонентов
import useFormValidation from '../../hooks/useFormValidation';
import Error from '../Error/Error';
import ProfileForm from '../ProfileForm/ProfileForm';
import Header from '../Header/Header';
import Preloader  from '../Preloader/Preloader';
import  { FORM_NAME_PATTERN, FORM_EMAIL_PATTERN } from '../../utils/constants';
import './Profile.css';

function Profile(props) {
  const {
    values,
    setValues,
    errorMessages,
    isValid,
    handleInputChange,
    reset
  } =  useFormValidation({});

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [currentUser.email, currentUser.name, setValues])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleUpdateUser(values);
    reset();
  }

  return (
    <>
       <Header loggedIn={props.loggedIn}/>
       <section className="profile">
        <ProfileForm
          name="form-profile"
          submitBtnText="Редактировать"
          onSubmit={handleSubmit}
          isValid={isValid}
          values={values}
        >
          {props.isLoading && <div className="form-profile__loader"><Preloader /></div>}
          <fieldset className="form-profile__field">
            <label className="form-profile__label" htmlFor="name">Имя</label>
            <input
              className="form-profile__input"
              onChange={handleInputChange}
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Имя"
              autoComplete="off"
              pattern={FORM_NAME_PATTERN}
              id="name"
              value={values.name || ''}
              required
            />
            {isValid ? '' : <div className="form-profile__error">{errorMessages.name}</div>}
          </fieldset>
          <fieldset className="form-profile__field">
            <label className="form-profile__label" htmlFor="email">E-mail</label>
            <input
              className="form-profile__input"
              onChange={handleInputChange}
              name="email"
              minLength="2"
              pattern={FORM_EMAIL_PATTERN}
              type="email"
              placeholder="E-mail"
              autoComplete="off"
              id="email"
              value={values.email || ''}
              required
            />
            {isValid ? '' : <div className="form-profile__error">{errorMessages.email}</div>}
          </fieldset>
          {props.formProfileSuccess && <span className="form-profile__success">{props.formProfileSuccess}</span>}
          {props.formProfileError && <Error>{props.formProfileError}</Error>}
        </ProfileForm>
        <button className="profile__logout" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </section>
    </>
  )

}

export default Profile;
