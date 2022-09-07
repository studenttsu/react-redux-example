import { Key } from 'react';
import { store, useAppSelector } from 'store';
import { CreateUserDto, UserDto } from 'common/dto';
import { confirm } from 'common/utils';

import { toggleSelectedIds } from './slice';
import { createUser, fetchUsers, removeUsers, updateUser } from './actions';

export const useUsersStore = () => useAppSelector((state) => state.users);

export const fetchUsersAction = (pageSize: number = 10, pageIndex: number = 0) =>
    store.dispatch(fetchUsers({ pageSize, pageIndex }));

export const selectUserRowsAction = (selectedKeys: Key[]) =>
    store.dispatch(toggleSelectedIds(selectedKeys));

export const createUserAction = (user: CreateUserDto) => store.dispatch(createUser(user));
export const updateUserAction = (user: UserDto) => store.dispatch(updateUser(user));

export const removeUsersAction = (userIds: number[]) => {
    return confirm(`Удалить ${userIds.length > 1 ? 'пользователей' : 'пользователя'}?`, 'Удалить')
        .then(() => store.dispatch(removeUsers(userIds)));
};

