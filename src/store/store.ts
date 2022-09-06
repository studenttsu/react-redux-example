import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import organizationsReducer from './organizations/slice';
import usersReducer  from 'features/users/state/slice';

const { REACT_APP_DEV } = process.env;

const rootReducer = combineReducers({
  organizations: organizationsReducer,
  users: usersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: REACT_APP_DEV === 'true',
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
