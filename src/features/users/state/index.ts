import { useAppSelector } from 'store/store';

export * from './actions';
export * from './slice';
export * from './facade';

export const useUsersStore = () => useAppSelector((state) => state.users);
