import { Key } from 'react';
import { store } from 'store';
import { toggleSelectedIds } from './slice';
import { fetchUsers } from 'features/users/state/actions';

export const fetchUsersAction = (pageSize: number = 10, pageIndex: number = 0) =>
    store.dispatch(fetchUsers({ pageSize, pageIndex }));

export const selectUserRowsAction = (selectedKeys: Key[]) =>
    store.dispatch(toggleSelectedIds(selectedKeys));