import { useState } from 'react';

function useFormValidation () {
  const [values, setValues] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleInputChange(evt) {
    let trimInput = evt.target.value.trim()
    setValues({
      ...values,
      [evt.target.name]: trimInput
    });
    setErrorMessages({
      ...errorMessages,
      [evt.target.name]: evt.target.validationMessage
    });
    setIsValid(
      evt.target.closest("form").checkValidity());
  };

  return {
    values,
    setValues,
    errorMessages,
    isValid,
    setIsValid,
    handleInputChange,
   };

}

export default useFormValidation;
