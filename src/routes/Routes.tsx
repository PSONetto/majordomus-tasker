import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}
