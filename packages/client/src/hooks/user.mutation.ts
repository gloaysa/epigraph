import { USER_ID_KEY } from '@/constants';
import { ApiService } from './api.service';
import { IUser } from '@/interfaces/user.interface';
import { useCallback } from 'react';

// const basePath = '/users';
const api = ApiService.getInstance();

export const useSetUser = () => {
  const setUser = useCallback(
    (user: IUser) => {
      window.localStorage.setItem(USER_ID_KEY, JSON.stringify(user));
      api.setApiToken(user.id);
    },
    [USER_ID_KEY]
  );

  return {
    setUser,
  };
};
