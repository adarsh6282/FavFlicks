import { Request, Response } from "express";

export interface IUserController{
    register(req:Request,res:Response):Promise<void>
    verifyOtp(req: Request, res: Response): Promise<void>
    loginUser(req: Request, res: Response): Promise<void>
}