import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrganizationsApi } from 'api';
import { setPendingState } from './slice';

export const fetchOrganizationList = createAsyncThunk('organizations/fetchData', (_, thunkAPI) => {
  thunkAPI.dispatch(setPendingState(true));
  return OrganizationsApi.getOrganizations();
});
