import { Route, Router, Switch, useLocation } from 'wouter';
import '@mantine/core/styles.css';
import 'primeflex/primeflex.css';
import './App.css';
import { AppRoutes } from './app.routes';
import { Button } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { USER_ID_KEY } from './constants';
import { useSetUser } from './hooks/user.mutation';
import { useRefreshBooks } from './hooks/book.queries';

function App() {
  const [, setLocation] = useLocation();

  const user = window.localStorage.getItem(USER_ID_KEY);
  const routes = useMemo(() => Object.values(AppRoutes), [AppRoutes]);

  const { setUser } = useSetUser();
  const { refreshBooks } = useRefreshBooks();

  useEffect(() => {
    if (!user) {
      setLocation(AppRoutes.UserList.url);
    } else {
      setUser(JSON.parse(user));
    }
  }, [user]);

  return (
    <>
      <nav className='w-full flex mb-2 justify-content-between align-items-center'>
        <img
          className='cursor-pointer'
          src='/icon512_rounded.png'
          width='50px'
          onClick={() => setLocation(AppRoutes.BookList.url)}
        />
        <div className='flex justify-content-end'>
          <Button
            size='xs'
            variant='subtle'
            onClick={() => refreshBooks()}
          >
            <span className='flex gap-2'>
              <span>↻</span> Refresh
            </span>
          </Button>
        </div>
      </nav>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.url}
              path={route.url}
              component={route.page}
            />
          ))}
        </Switch>
      </Router>
    </>
  );
}

export default App;
