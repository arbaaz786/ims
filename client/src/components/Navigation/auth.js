import React from 'react';
import { useDispatch } from 'redux-react-hook';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import * as actions from '../../constants/action_types';

function AuthNavigation() {
  const dispatch = useDispatch();

  function logout() {
    dispatch({ type: actions.SET_AUTH_USER, authUser: null });
    localStorage.removeItem('token');
  }

  return (
    <div className='navbar is-fixed-top'>
      <div className='navbar-left'>
        <Link to={routes.HOME}>
          <i class='fas fa-home fa-2x'></i>
        </Link>
      </div>
      <div className='navbar-right' style={{ justifyContent: 'flex-end' }}>
        <Link to={routes.CreateInvoice}>New Invoice</Link>
      </div>
      <div className='navbar-right' style={{ justifyContent: 'flex-end' }}>
        <Link to={routes.HOME} onClick={logout}>
          <i class='fas fa-sign-out-alt fa-2x'></i>
        </Link>
      </div>
    </div>
  );
}

export default AuthNavigation;
