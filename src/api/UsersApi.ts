import { UserDto } from 'common/dto';
import { IPaginatedData } from 'common/interfaces';

const data: UserDto[] = [
    {
        id: '12345',
        firstName: 'qq',
        lastName: 'qq',
        patronymic: 'ww',
        email: 'email',
        organization: 'qwe'
    }
];

class UsersApi {
    getUsers(): Promise<IPaginatedData<UserDto>> {
        return new Promise(r => {
            setTimeout(() => {
                r({ totalRecords: data.length, pageData: data });
            }, 1000);
        })
    }
}

export default new UsersApi();
