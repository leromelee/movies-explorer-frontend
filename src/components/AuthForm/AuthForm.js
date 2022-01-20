import "./AuthForm.css";

function AuthForm(props) {
    return (
    <form className={`form form_type_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
      <h2 className="form__heading">{props.title}</h2>
      {props.children}
      <button
        className={props.isValid ? 'form__button' : 'form__button form__button_type_disabled'}
        disabled={!props.isValid}
        type="submit">{props.submitBtnText}
      </button>
    </form>
    )
}

export default AuthForm;

