import React from 'react';
import { Link } from 'react-router-dom';
import './AuthMenu.css';

function AuthMenu() {
  return (
    <nav className="auth-menu">
      <ul className="auth-menu__list">
        <li className="auth-menu__item">
          <Link className="auth-menu__link" to="/signup">Регистрация</Link>
        </li>
        <li className="auth-menu__item">
          <Link className="auth-menu__link auth-menu__link_type_login" to="/signin">Войти</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AuthMenu;

