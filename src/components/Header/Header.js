import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthMenu from '../AuthMenu/AuthMenu';
import './Header.css'

function Header(props) {
  const { loggedIn } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }
  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`header`}>
      <div className="header__wrapper">
        <Logo />
        {loggedIn ? (
          <>
            <Navigation isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
            <button className="header__mobile-button" type="button" onClick={handleMenuOpen}>
              <span className="header__mobile-line"></span>
              <span className="header__mobile-line"></span>
              <span className="header__mobile-line"></span>
            </button>
          </>
        ) : <AuthMenu />}
      </div>
    </header>
  );
};

export default Header;
