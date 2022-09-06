import { UserDto } from 'common/dto';
import { IPaginatedData } from 'common/interfaces';

class UsersApi {
    getUsers(): Promise<IPaginatedData<UserDto>> {
        return fetch('/mock/users.json')
            .then(response => response.json())
            .then(data => ({ totalRecords: data.users.length, pageData: data.users }));
    }
}

export default new UsersApi();
