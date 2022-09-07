import axios from 'axios';
import { CreateUserDto, UserDto } from 'common/dto';
import { IPaginatedData } from 'common/interfaces';

class UsersApi {
    getUsers(): Promise<IPaginatedData<UserDto>> {
        return axios('/mock/users.json', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => ({
                totalRecords: response.data.users.length,
                pageData: response.data.users
            }));
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
