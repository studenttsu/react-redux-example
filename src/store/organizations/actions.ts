import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrganizationsApi } from 'api';
import { setPendingState } from './slice';
import { AppState } from 'store/store';

export const fetchOrganizations = createAsyncThunk('organizations/fetchData', (_, thunkAPI) => {
  // @ts-ignore
  const state: AppState = thunkAPI.getState();

  if (!state.organizations.organizationsList.length) {
    thunkAPI.dispatch(setPendingState(true));

    return OrganizationsApi.getOrganizations()
        .finally(() => thunkAPI.dispatch(setPendingState(false)));
  }

  return state.organizations.organizationsList;
});
