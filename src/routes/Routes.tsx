import { ErrorBoundary } from 'react-error-boundary';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Fallback from '../components/error/Error';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/auth/AuthContext';
import Collaborators from '../pages/collaborators/Collaborators';
import Home from '../pages/home/Home';
import Task from '../pages/tasks/Tasks';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Routes>
            <Route element={<Home />} path="/" />
            {user && (
              <>
                <Route element={<Task />} path="/tasks" />
                <Route element={<Collaborators />} path="/collaborators" />
              </>
            )}
          </Routes>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}
