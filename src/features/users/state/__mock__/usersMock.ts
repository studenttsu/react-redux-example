import { UserDto } from 'common/dto';

export const mockUserFactory = (id: number) => ({
    id,
    firstName: 'firstName',
    lastName: 'lastName',
    patronymic: 'patronymic',
    organizationId: 1,
    organizationName: 'organizationName',
    email: 'email'
});

export const usersMockData: UserDto[] = (new Array(3)).fill(null)
    .map((_, index) => mockUserFactory(index + 1));