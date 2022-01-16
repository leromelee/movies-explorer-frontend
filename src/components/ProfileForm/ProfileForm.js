import React, { useContext } from 'react';
import "./ProfileForm.css";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ProfileForm(props) {
  const { name } = useContext(CurrentUserContext);
    return (
    <form className="form-profile form-profile_type_centered" name={`${props.name}`} onSubmit={props.onSubmit}>
      <h2 className="form-profile__heading">Привет, { name }!</h2>
      {props.children}
      <button
        disabled={!props.isValid }
        type="submit"
        className={!props.isValid || props.values.name.length === 0 || props.values.email.length === 0
         ? "form-profile__button form-profile__button_type_disabled"
         : "form-profile__button"}
      >
        {props.submitBtnText}
      </button>
    </form>
    )
}

export default ProfileForm;

