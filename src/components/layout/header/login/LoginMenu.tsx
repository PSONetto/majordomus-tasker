import { useState } from 'react';

import { Button } from 'primereact/button';

import { api } from '../../../../api/api';
import { useAuth } from '../../../../contexts/auth/AuthContext';
import Login from '../../../auth/login/Login';
import Profile from '../../../auth/profile/Profile';
import SignUp from '../../../auth/signup/SignUp';

export default function LoginMenu() {
  const { user } = useAuth();

  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [profieVisible, setProfileVisible] = useState(false);

  const handleLogout = async () => {
    try {
      const resp = await api.post('logout');
      if (resp.status === 200) {
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SignUp visible={signUpVisible} setVisible={setSignUpVisible} />

      <Login visible={loginVisible} setVisible={setLoginVisible} />

      <Profile visible={profieVisible} setVisible={setProfileVisible}></Profile>

      <div className="flex mr-2">
        {user ? (
          <>
            <Button
              name="logout"
              label="Logout"
              text
              severity="danger"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="mr-1"
            />
            <Button
              name="profile"
              label="Profile"
              onClick={(e) => {
                e.preventDefault();
                setProfileVisible(true);
              }}
            />
          </>
        ) : (
          <>
            <Button
              name="signUp"
              label="Sing Up"
              severity="danger"
              className="mr-1"
              onClick={(e) => {
                e.preventDefault();
                setSignUpVisible(true);
              }}
            />
            <Button
              name="login"
              label="Login"
              onClick={(e) => {
                e.preventDefault();
                setLoginVisible(true);
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
