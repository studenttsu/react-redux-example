export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    organizationId: number;
    email: string;
}

export interface CreateUserDto extends Omit<UserDto, 'id'> {}
