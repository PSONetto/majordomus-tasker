import { createContext, useContext, useState } from 'react';

import { apiSanctum } from '../../api/api';

export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  csrfToken: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  csrfToken: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, _setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem('user') || 'null'),
  );

  const setUser = (user: IUser) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }

    _setUser(user);
  };

  const csrfToken = async () => {
    await apiSanctum.get('csrf-cookie');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, csrfToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
