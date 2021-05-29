import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { Navbar as BootstrapNav } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from '../features/userSlice';
import '../styling/navbar.css';

const Navbar = () => {
  const [inputValue, setInputValue] = useState('tech');
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  return (
    <BootstrapNav collapseOnSelect expand='lg' className='navbar container-fluid navbar-dark navbar navbar-expand-lg'>
      <h1 className='navbar__header'>BlogMania 💬</h1>
      <BootstrapNav.Toggle aria-controls='responsive-navbar-nav' />

      <BootstrapNav.Collapse id='responsive-navbar-nav'>
        {isSignedIn && (
          <div className='blog__search'>
            <input
              className='search'
              placeholder='Search for a blog'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='submit' onClick={handleClick}>
              Search
            </button>
          </div>
        )}

        {isSignedIn ? (
          <div className='navbar__user__data'>
            <Avatar className='user' src={userData?.imageUrl} alt={userData?.name} />
            <h1 className='signedIn'>{userData?.givenName}</h1>
            <GoogleLogout
              clientId='57529085775-fk8rn8hren1q8o5ja2idq4m7hug5aong.apps.googleusercontent.com'
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='logout__button'
                >
                  Logout
                </button>
              )}
              onLogoutSuccess={logout}
            />
          </div>
        ) : (
          ''
        )}
      </BootstrapNav.Collapse>
    </BootstrapNav>
  );
};

export default Navbar;
