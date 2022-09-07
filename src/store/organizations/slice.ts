import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { fetchOrganizations } from './actions';
import { OrganizationShortDto } from 'common/dto';

export interface OrganizationsState {
  organizationsList: OrganizationShortDto[];
  isPending: boolean;
}

const organizationsSlice = createSlice<OrganizationsState, SliceCaseReducers<OrganizationsState>>({
  name: 'organizations',
  initialState: {
    organizationsList: [],
    isPending: false,
  },
  reducers: {
    setPendingState(state, action: PayloadAction<boolean>) {
      state.isPending = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      state.organizationsList = action.payload;
    });
  },
});

export const { setPendingState } = organizationsSlice.actions;
export default organizationsSlice.reducer;
