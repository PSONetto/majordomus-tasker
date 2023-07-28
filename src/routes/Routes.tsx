import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';

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
