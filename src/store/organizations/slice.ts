import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { fetchOrganizationList } from './actions';
import { IdNameDto } from 'common/dto';

interface OrganizationsState {
  organizationList: IdNameDto[];
  isPending: boolean;
}

const organizationsSlice = createSlice<OrganizationsState, SliceCaseReducers<OrganizationsState>>({
  name: 'organizations',
  initialState: {
    organizationList: [],
    isPending: false,
  },
  reducers: {
    // Changing pending state of fetching organizations
    setPendingState(state, action: PayloadAction<boolean>) {
      state.isPending = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch request successful complete
    builder.addCase(fetchOrganizationList.fulfilled, (state, action) => {
      state.organizationList = action.payload;
      state.isPending = false;
    });

    // Fetch request failed
    builder.addCase(fetchOrganizationList.rejected, (state) => {
      state.isPending = false;
    });
  },
});

export const { setPendingState } = organizationsSlice.actions;
export default organizationsSlice.reducer;
