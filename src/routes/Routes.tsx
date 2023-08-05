import { ErrorBoundary } from 'react-error-boundary';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Fallback from '../components/error/Error';
import Layout from '../components/layout/Layout';
import Home from '../pages/home/Home';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Routes>
            <Route element={<Home />} path="/" />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}
