import { Key } from 'react';
import { store } from 'store';
import { CreateUserDto, UserDto } from 'common/dto';

import { toggleSelectedIds } from './slice';
import { createUser, fetchUsers, removeUsers, updateUser } from './actions';

export const fetchUsersAction = (pageSize: number = 10, pageIndex: number = 0) =>
    store.dispatch(fetchUsers({ pageSize, pageIndex }));

export const selectUserRowsAction = (selectedKeys: Key[]) =>
    store.dispatch(toggleSelectedIds(selectedKeys));

export const removeUsersAction = (userIds: number[]) => store.dispatch(removeUsers(userIds));
export const editUserAction = (user: UserDto) => store.dispatch(updateUser(user));
export const createUserAction = (user: CreateUserDto) => store.dispatch(createUser(user));
