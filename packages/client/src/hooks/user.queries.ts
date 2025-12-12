import { useQuery } from '@tanstack/react-query';
import { ApiService } from './api.service';
import { IUser } from '@/interfaces/user.interface';

const basePath = '/users';
const api = ApiService.getInstance();

export const UserQueries = {
  all: ['users'],
  byId: (id: string) => [...UserQueries.all, id],
};

export function useGetUsers() {
  const {
    data: users,
    error: usersError,
    isFetching: usersLoading,
  } = useQuery({
    queryKey: [...UserQueries.all],
    queryFn: async () => api.get<IUser[]>(`${basePath}`),
  });

  return { users, usersLoading, usersError };
}

export const useGerUserById = (userId: string) => {
  const {
    data: user,
    error: userError,
    isFetching: userLoading,
  } = useQuery({
    queryKey: [...UserQueries.byId(userId)],
    queryFn: async () => api.get<IUser>(`${basePath}/${userId}`),
    enabled: !!userId,
    retry: false,
  });

  return {
    user,
    userLoading,
    userError,
  };
};
