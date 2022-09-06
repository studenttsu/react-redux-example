import { Key } from 'react';
import { store } from 'store';
import { toggleSelectedIds } from './slice';
import { fetchUsers, removeUsers } from './actions';

export const fetchUsersAction = (pageSize: number = 10, pageIndex: number = 0) =>
    store.dispatch(fetchUsers({ pageSize, pageIndex }));

export const selectUserRowsAction = (selectedKeys: Key[]) =>
    store.dispatch(toggleSelectedIds(selectedKeys));

export const removeUsersAction = (userIds: number[]) =>
    store.dispatch(removeUsers(userIds));