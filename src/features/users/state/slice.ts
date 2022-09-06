import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { IPaginatedData } from 'common/interfaces';
import { UserDto } from 'common/dto';
import { fetchUsers, removeUsers } from './actions';

interface UsersState extends IPaginatedData<UserDto> {
  isPending: boolean;
  selectedIds: number[];
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
    toggleSelectedIds(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
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

    builder.addCase(removeUsers.fulfilled, (state, action) => {
      const userIds = action.payload;
      state.pageData = state.pageData.filter(item => !userIds.includes(item.id));
      state.selectedIds = state.selectedIds.filter(id => !userIds.includes(id));    });
  },
});

export const { setPendingState, toggleSelectedIds } = usersSlice.actions;
export default usersSlice.reducer;
