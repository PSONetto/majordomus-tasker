import { useAuth } from '../../../contexts/auth/AuthContext';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import LoginMenu from './login/LoginMenu';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex justify-content-between align-items-center shadow-1">
      <Logo />
      {user && <HeaderMenu />}
      <LoginMenu />
    </header>
  );
}
