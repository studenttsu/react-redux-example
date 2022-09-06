import { useAppSelector } from '../store';

export * from './actions';
export * from './slice';

export const useOrganizationsStore = () => useAppSelector((state) => state.organizations);
