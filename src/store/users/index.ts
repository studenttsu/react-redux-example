import { useAppSelector } from '../store';

export * from './actions';
export * from './slice';

export const useUsersStore = () => useAppSelector((state) => state.users);
