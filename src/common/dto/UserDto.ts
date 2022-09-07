export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    organizationId: number;
    organizationName: string;
    email: string;
}

export interface CreateUserDto extends Omit<UserDto, 'id'> {}
