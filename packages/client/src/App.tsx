import { Route, Router, Switch, useLocation } from 'wouter';
import '@mantine/core/styles.css';
import 'primeflex/primeflex.css';
import './App.css';
import { AppRoutes } from './app.routes';
import { MantineProvider } from '@mantine/core';
import { useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { USER_ID_KEY } from './constants';
import { useSetUser } from './hooks/user.mutation';

function App() {
  const [, setLocation] = useLocation();

  const user = window.localStorage.getItem(USER_ID_KEY);
  const routes = useMemo(() => Object.values(AppRoutes), [AppRoutes]);

  const { setUser } = useSetUser();

  useEffect(() => {
    if (!user) {
      setLocation(AppRoutes.UserList.url);
    } else {
      setUser(JSON.parse(user));
    }
  }, [user]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
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
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
