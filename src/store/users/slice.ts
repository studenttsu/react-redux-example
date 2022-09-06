import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { IPaginatedData } from 'common/interfaces';
import { UserDto } from 'common/dto';
import { fetchUsers } from './actions';

interface UsersState extends IPaginatedData<UserDto> {
  isPending: boolean;
  selectedIds: string[];
}

const usersSlice = createSlice<UsersState, SliceCaseReducers<UsersState>>({
  name: 'users',
  initialState: {
    totalRecords: 0,
    pageData: [],
    isPending: false,
    selectedIds: [],
  },
  reducers: {
    setPendingState(state, action: PayloadAction<boolean>) {
      state.isPending = action.payload;
    },
    toggleSelectedIds(state, action: PayloadAction<string>) {
      const id = action.payload;
      const isSelected = state.selectedIds.includes(id);

      state.selectedIds = isSelected
        ? state.selectedIds.filter(x => x !== id)
        : state.selectedIds.concat(id);
    },
    resetSelectedIds(state) {
      state.selectedIds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { totalRecords, pageData } = action.payload;
      state.isPending = false;
      state.totalRecords = totalRecords;
      state.pageData = pageData;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.isPending = false;
    });
  },
});

export const { setPendingState, toggleSelectedIds, resetSelectedIds } = usersSlice.actions;
export default usersSlice.reducer;
