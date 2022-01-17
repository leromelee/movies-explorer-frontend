import React, { useContext } from 'react';
import "./ProfileForm.css";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormValidation from "../../hooks/useFormValidation";

function ProfileForm(props) {
  const { name } = useContext(CurrentUserContext);
  const {
    setValues,
  } =  useFormValidation({});

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    })
  }, [currentUser.email, currentUser.name, setValues])
    return (
    <form className="form-profile form-profile_type_centered" name={`${props.name}`} onSubmit={props.onSubmit}>
      <h2 className="form-profile__heading">Привет, { name }!</h2>
      {props.children}
      <button
        type="submit"
        className={`${!props.isValid || props.values.name.length === 0 || props.values.email.length === 0
         ? "form-profile__button form-profile__button_type_disabled"
         : "form-profile__button"} ${props.values.email === currentUser.email &&
        props.values.name === currentUser.name &&
          "form-profile__button_type_disabled"
        }
        ${props.handleUpdateUser && "form-profile__button_type_disabled"}`}
      >
        {props.submitBtnText}
      </button>
    </form>
    )
}

export default ProfileForm;

