import React from 'react';

import './Checkbox.css';
export default function Checkbox({ checkboxOn, handleToggleCheckbox }) {
  return (
    <div className="checkbox">
      <div className="checkbox__wrapper">
        <input
          checked={checkboxOn}
          onChange={handleToggleCheckbox}
          className="checkbox__input"
          id="checkbox"
          type="checkbox"
        />
        <label
          className="checkbox__label"
          htmlFor="checkbox"
        >
          <span
            className="checkbox__button"
            style={{ background: checkboxOn && 'white' }}
          />
        </label>
      </div>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  );
}