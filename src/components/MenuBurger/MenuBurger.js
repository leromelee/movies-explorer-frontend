import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './MenuBurger.css';

export default function MenuBurger({ activeBurger, setActiveBurger }) {
  const location = useLocation();
  const handleClick = () => {
    setActiveBurger(false);
  };

  const handleNotClick = (evt) => {
    evt.stopPropagation();
  };

  return (
    <nav
      className={activeBurger ? 'menu-burger_active' : 'menu-burger'}
      onClick={handleClick}
    >
      <ul
        className="menu-burger__list"
        onClick={handleNotClick}
      >
        <li className="menu-burger__item">
          <Link
            className={`
              menu-burger__link
              ${location.pathname === '/' ? 'menu-burger__link_active' : ''}
            `}
            to="/"
            onClick={handleClick}
          >
            Главная
          </Link>
        </li>
        <li className="menu-burger__item">
          <Link
            className={`
              menu-burger__link
              ${location.pathname === '/movies' ? 'menu-burger__link_active' : ''}
            `}
            to="/movies"
            onClick={handleClick}
          >
            Фильмы
          </Link>
        </li>
        <li className="menu-burger__item">
          <Link
            className={`
              menu-burger__link
              ${location.pathname === '/saved-movies' ? 'menu-burger__link_active' : ''}
            `}
            to="/saved-movies"
            onClick={handleClick}
          >
            Сохранённые фильмы
          </Link>
        </li>
        <li className="menu-burger__item_type_profile">
          <Link
            className={`
            menu-burger__link_type_profile
              ${location.pathname === '/profile' ? 'menu-burger__link_type_profile-active' : ''}
            `}
            to="/profile"
            onClick={handleClick}
          >
            Аккаунт
          </Link>
        </li>
        <li className="menu-burger__item_type_button-close">
          <button
            className="menu-burger__link_type_button-close"
            type="button"
            aria-label="Закрыть"
            onClick={handleClick}
          />
        </li>
      </ul>
    </nav>
  );
}