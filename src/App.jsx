/* eslint-disable linebreak-style */
import React, { lazy, Suspense } from 'react';
import {
  Filter, Header, Layout, Navbar,
} from 'components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';
import { BASE_URL } from 'constants';
import { useSelector } from 'react-redux';
import { selectUser } from 'states/users/userSlice';

const HomePage = lazy(() => import('./pages/Homepage'));
const DetailPage = lazy(() => import('./pages/Detail'));
const LoginPage = lazy(() => import('./pages/Login'));
const LeaderboardPage = lazy(() => import('./pages/Leaderboard'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const RegisterPage = lazy(() => import('./pages/Register'));

function App() {
  const location = useLocation();
  const users = useSelector(selectUser);

  return (
    <Layout>
      <Navbar />
      {location
        && location.pathname !== BASE_URL.LOGIN
        && location.pathname !== BASE_URL.REGISTER && <Header />}
      {location && location.pathname === BASE_URL.HOMEPAGE && <Filter />}

      <Routes>
        <Route
          path={BASE_URL.HOMEPAGE}
          element={(
            <Suspense
              fallback={(
                <Center>
                  <Spinner size="xl" />
                </Center>
              )}
            >
              <HomePage />
            </Suspense>
          )}
        />
        <Route
          path={BASE_URL.THREAD_DETAIL}
          element={(
            <Suspense
              fallback={(
                <Center>
                  <Spinner size="xl" />
                </Center>
              )}
            >
              <DetailPage />
            </Suspense>
          )}
        />
        <Route
          path={BASE_URL.LEADERBOARD}
          element={(
            <Suspense
              fallback={(
                <Center>
                  <Spinner size="xl" />
                </Center>
              )}
            >
              <LeaderboardPage />
            </Suspense>
          )}
        />

        {/* Auth Route */}
        { users && !users.authenticated && (
          <>
            <Route
              path={BASE_URL.LOGIN}
              element={(
                <Suspense
                  fallback={(
                    <Center>
                      <Spinner size="xl" />
                    </Center>
                  )}
                >
                  <LoginPage />
                </Suspense>
              )}
            />
            <Route
              path={BASE_URL.REGISTER}
              element={(
                <Suspense
                  fallback={(
                    <Center>
                      <Spinner size="xl" />
                    </Center>
                  )}
                >
                  <RegisterPage />
                </Suspense>
              )}
            />
          </>
        )}

        <Route
          path="*"
          element={(
            <Suspense
              fallback={(
                <Center>
                  <Spinner size="xl" />
                </Center>
              )}
            >
              <NotFoundPage />
            </Suspense>
          )}
        />
      </Routes>
    </Layout>
  );
}

export default App;
