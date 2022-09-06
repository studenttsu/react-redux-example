import { Guid } from '../types';

export interface UserDto {
    id: Guid;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    organization: string;
}