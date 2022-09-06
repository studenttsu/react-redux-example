import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { IPaginatedData } from 'common/interfaces';
import { UserDto } from 'common/dto';
import { createUser, fetchUsers, removeUsers, updateUser } from './actions';

export interface UsersState extends IPaginatedData<UserDto> {
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
      state.totalRecords = totalRecords;
      state.pageData = pageData;
    });

    builder.addCase(removeUsers.fulfilled, (state, action) => {
      const userIds = action.payload;
      state.pageData = state.pageData.filter(item => !userIds.includes(item.id));
      state.selectedIds = state.selectedIds.filter(id => !userIds.includes(id));
      state.totalRecords = state.totalRecords - userIds.length;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.pageData = state.pageData.concat(action.payload);
      state.totalRecords = state.totalRecords + 1;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const user = action.payload;

      state.pageData = state.pageData.map(item => {
        if (item.id === user.id) {
          return user;
        }

        return item;
      });
    });
  },
});

export const { setPendingState, toggleSelectedIds } = usersSlice.actions;
export default usersSlice.reducer;
