import { useState, useCallback } from 'react';

export default function useValidForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidForm, setValidForm] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name } = input;
    const { value } = input;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setValidForm(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newValidForm = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValidForm(newValidForm);
    },
    [setValues, setErrors, setValidForm],
  );

  return {
    values, setValues, errors, isValidForm, handleChange, resetForm,
  };
}