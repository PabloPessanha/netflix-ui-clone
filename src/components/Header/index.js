import React from 'react';
import './style.css';
import Logo from './images/logo.png';
import User from './images/user-img.png';

export default ({ black }) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className="header-logo">
        <a href="/">
          <img src={Logo}></img>
        </a>
      </div>
      <div className="header-user">
        <img src={User}></img>
      </div>
    </header>
  );
};
