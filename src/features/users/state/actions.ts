import { createAsyncThunk } from '@reduxjs/toolkit';
import { UsersApi } from 'api';
import { setPendingState, UsersState } from './slice';
import { confirm } from 'common/utils';
import { CreateUserDto, UserDto } from 'common/dto';
import { AppState } from 'store';

type FetchUsersPayload = { pageSize: number; pageIndex: number };

export const fetchUsers = createAsyncThunk('users/fetch', ({ pageSize, pageIndex }: FetchUsersPayload, thunkAPI) => {
  thunkAPI.dispatch(setPendingState(true));

  return UsersApi.getUsers()
      .finally(() => thunkAPI.dispatch(setPendingState(false)))
});

export const removeUsers = createAsyncThunk('users/removeUsers', (userIds: number[] = [], thunkAPI) => {
  return confirm(`Удалить ${userIds.length > 1 ? 'пользователей' : 'пользователя'}?`, 'Удалить')
      .then(() => {
        thunkAPI.dispatch(setPendingState(true));
        return Promise.all(userIds.map(UsersApi.remove))
      })
      .then(() => userIds)
      .finally(() => thunkAPI.dispatch(setPendingState(false)));
});

export const createUser = createAsyncThunk('users/create', (user: CreateUserDto, thunkAPI) => {
    // @ts-ignore
    const state: AppState = thunkAPI.getState();
    thunkAPI.dispatch(setPendingState(true));

    return UsersApi.create(user, state.users.pageData.length)
        .finally(() => thunkAPI.dispatch(setPendingState(false)));
});

export const updateUser = createAsyncThunk('users/update', (user: UserDto, thunkAPI) => {
    thunkAPI.dispatch(setPendingState(true));

    return UsersApi.update(user)
        .finally(() => thunkAPI.dispatch(setPendingState(false)));
});
