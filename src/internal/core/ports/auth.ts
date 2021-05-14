/* eslint-disable no-unused-vars */
export interface AuthRepository{
    SignIn(email: string, password: string): Promise<string>;
}
