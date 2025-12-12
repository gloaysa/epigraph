import { Stack } from '@mantine/core';
import { useLocation } from 'wouter';
import { ErrorComponent, LoadingComponent } from '../../components/Book/BookStatus';
import { useGetUsers } from '@/hooks/user.queries';
import { IUser } from '@/interfaces/user.interface';
import { AppRoutes } from '@/app.routes';
import { useSetUser } from '@/hooks/user.mutation';

export const UserListPage = () => {
  const [, setLocation] = useLocation();

  const { users, usersLoading, usersError } = useGetUsers();
  const { setUser } = useSetUser();

  const handleSelectUser = (user: IUser) => {
    setUser(user);
    setLocation(AppRoutes.BookList.url);
  };

  if (usersLoading) {
    return <LoadingComponent />;
  }

  if (usersError) {
    return <ErrorComponent message={usersError.message} />;
  }

  if (!users) {
    return null;
  }

  return (
    <Stack
      className='book-list-page'
      gap='sm'
    >
      {users.map((user) => (
        <div
          key={user.id}
          className='user_item cursor-pointer'
          onClick={() => handleSelectUser(user)}
        >
          {user.name}
        </div>
      ))}
    </Stack>
  );
};
