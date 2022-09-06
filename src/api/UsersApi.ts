import { CreateUserDto, UserDto } from 'common/dto';
import { IPaginatedData } from 'common/interfaces';

class UsersApi {
    getUsers(): Promise<IPaginatedData<UserDto>> {
        return fetch('/mock/users.json')
            .then(response => response.json())
            .then(data => ({ totalRecords: data.users.length, pageData: data.users }));
    }

    create(data: CreateUserDto, usersLength: number): Promise<UserDto> {
        return Promise.resolve({
            ...data,
            id: usersLength + 1
        });
    }

    update(data: UserDto): Promise<UserDto> {
        return Promise.resolve(data);
    }

    remove(userId: number): Promise<void> {
        return Promise.resolve();
    }
}

export default new UsersApi();
