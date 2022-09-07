import { store, useAppSelector } from '../store';
import { fetchOrganizations } from 'store/organizations/actions';

export const useOrganizationsStore = () => useAppSelector((state) => state.organizations);

export const fetchOrganizationsActions = () => store.dispatch(fetchOrganizations());