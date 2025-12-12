import { BookDetailPage } from './pages/BookDetail/BookDetail.page';
import { BookHighlightPage } from './pages/BookHighlight/BookHighlight.page';
import { BookListPage } from './pages/BookList/BookList.page';
import { UserListPage } from './pages/UserList/UserList.page';

export const AppRoutes = {
  BookList: {
    url: '/',
    page: BookListPage,
  },
  BookDetail: {
    url: '/book/:bookId',
    page: BookDetailPage,
  },
  BookHighlight: {
    url: '/book/:bookId/entry/:entryId',
    page: BookHighlightPage,
  },
  UserList: {
    url: '/users',
    page: UserListPage,
  },
};
