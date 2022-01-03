import dayjs from 'dayjs';

export interface IUserAccount {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  birthday?: string | null;
  address?: number | null;
  password?: string | null;
}

export const defaultValue: Readonly<IUserAccount> = {};
