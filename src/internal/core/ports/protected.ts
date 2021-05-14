/* eslint-disable no-unused-vars */
import { Response } from 'express';

export interface ProtectedRepository{
    generateFile(url: string, res: Response): Promise<string>;
    fetchData(url: string): any;
}
