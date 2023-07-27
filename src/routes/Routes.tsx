import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Layout from '../components/layout/Layout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
