import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
  <div className="checkbox">
    <div className="checkbox__wrapper">
      <input
        type="checkbox" onClick={props.filterHandler}
        className="checkbox__input" id="checkbox"
      />
      <label
        className="checkbox__label"
        htmlFor="checkbox"
      >
          <span
            className="checkbox__button"
            style={{ background: props.filterHandler && 'white' }}
          />
      </label>
    </div>
    <p className="checkbox__text">Короткометражки</p>
  </div>
    )
}

export default FilterCheckbox;
