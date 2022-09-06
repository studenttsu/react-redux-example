import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersApi } from 'api';
import { setPendingState } from './slice';

type FetchUsersPayload = { pageSize: number; pageIndex: number };

export const fetchUsers = createAsyncThunk('users/fetch', ({ pageSize, pageIndex }: FetchUsersPayload, thunkAPI) => {
  thunkAPI.dispatch(setPendingState(true));
  return UsersApi.getUsers();
});
