/* eslint-disable no-unused-vars */
export interface AuthRepository{
    Login(email: string, password: string): Promise<string>;
}
