import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersApi } from 'api';
import { setPendingState } from './slice';
import { confirm } from 'common/utils';

type FetchUsersPayload = { pageSize: number; pageIndex: number };

export const fetchUsers = createAsyncThunk('users/fetch', ({ pageSize, pageIndex }: FetchUsersPayload, thunkAPI) => {
  thunkAPI.dispatch(setPendingState(true));
  return UsersApi.getUsers();
});

export const removeUsers = createAsyncThunk('users/removeUsers', (userIds: number[] = []) => {
  return confirm(`Удалить ${userIds.length > 1 ? 'пользователей' : 'пользователя'}?`, 'Удалить')
      .then(() => userIds);
});
