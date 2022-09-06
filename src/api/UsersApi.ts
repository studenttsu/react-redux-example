import { UserDto } from 'common/dto';
import { IPaginatedData } from 'common/interfaces';

class UsersApi {
    getUsers(): Promise<IPaginatedData<UserDto>> {
        return Promise.resolve({ totalRecords: 0, pageData: [] });
    }
}

export default new UsersApi();
