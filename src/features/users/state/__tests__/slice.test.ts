import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { store } from 'store';
import { UserDto } from 'common/dto';
import { IPaginatedData } from 'common/interfaces';
import { mockUserFactory, usersMockData } from '../__mock__/usersMock';
import { createUserAction, fetchUsersAction, updateUserAction } from '../index';
import { removeUsers } from '../actions';
import { UsersState } from '../slice';

// TODO: убрать в utils
const lastListElem = (list: any[]) => list[list.length - 1];

describe('Users Store', () => {
    beforeAll(() => {
        const mock = new MockAdapter(axios);
        mock.onGet('/mock/users.json').reply(200, { users: usersMockData });
    });

    test('Инициализация стора', () => {
        const state = store.getState().users;

        const initialState: UsersState = {
            totalRecords: 0,
            pageData: [],
            isPending: false,
            selectedIds: [],
        };

        expect(state).toEqual(initialState);
    });

    test('Получение пользователей', async () => {
        const result = await fetchUsersAction();
        const response = result.payload as IPaginatedData<UserDto>;

        expect(result.type).toBe('users/fetch/fulfilled');
        expect(response.pageData).toEqual(usersMockData);
        expect(response.totalRecords).toEqual(usersMockData.length);

        const state = store.getState().users;
        expect(state.pageData).toEqual(usersMockData);
        expect(state.totalRecords).toBe(usersMockData.length);
    });

    test('Добавление пользователя', async () => {
        const beforeTotalRecords = store.getState().users.totalRecords;
        const user = mockUserFactory(beforeTotalRecords + 1);

        const result = await createUserAction(user);
        const createdUser = result.payload as UserDto;

        expect(result.type).toBe('users/create/fulfilled');
        expect(createdUser).toEqual(user);

        const state = store.getState().users;
        expect(state.totalRecords).toBe(beforeTotalRecords + 1);
        expect(lastListElem(state.pageData)).toEqual(user);
    });

    test('Редактирование пользователя', async () => {
        const state = store.getState().users;
        const beforeUpdateUser = {...lastListElem(state.pageData)};

        expect(beforeUpdateUser.firstName).toBe('firstName');
        expect(beforeUpdateUser.lastName).toBe('lastName');

        beforeUpdateUser.firstName = 'new firstName';
        beforeUpdateUser.lastName = 'new lastName';

        await updateUserAction(beforeUpdateUser);
        const newState = store.getState().users;
        const updatedUser = lastListElem(newState.pageData);

        expect(updatedUser.firstName).toBe('new firstName');
        expect(updatedUser.lastName).toBe('new lastName');
    });

    test('Удаление одного пользователя', async () => {
        const state = store.getState().users;
        const lastUserId = lastListElem(state.pageData).id;
        const beforeTotalRecords = state.totalRecords;

        await store.dispatch(removeUsers([lastUserId]));

        const newState = store.getState().users;
        const existedUser = newState.pageData.find(x => x.id === lastUserId);

        expect(existedUser).toBeUndefined();
        expect(newState.totalRecords).not.toBe(beforeTotalRecords);
        expect(newState.totalRecords).toBe(beforeTotalRecords - 1);
        expect(lastListElem(newState.pageData).id).not.toBe(lastUserId);
    });

    test('Удаление нескольких пользователей', async () => {
        const state = store.getState().users;
        const beforeTotalRecords = state.totalRecords;
        const userIds = state.pageData.map(x => x.id);

        await store.dispatch(removeUsers([userIds[0], lastListElem(userIds)]));

        const newState = store.getState().users;
        const existedFirstUser = newState.pageData.find(x => x.id === userIds[0]);
        const existedLastUser = newState.pageData.find(x => x.id === lastListElem(userIds));

        expect(existedFirstUser).toBeUndefined();
        expect(existedLastUser).toBeUndefined();
        expect(newState.totalRecords).toBe(beforeTotalRecords - 2);
    });
});