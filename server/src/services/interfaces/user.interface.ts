import { IUser } from "../../models/interfaces/user.interface";

export interface IUserService{
    registerUser(email:string):Promise<void>
    verifyOtp(
    data: IUser & { otp: string }
  ): Promise<{ user: IUser; token: string; }>
  loginUser(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string; }>
}