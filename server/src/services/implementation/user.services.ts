import { IUser } from "../../models/interfaces/user.interface";
import { IOtpRepository } from "../../repository/interfaces/otp.interface";
import { IUserRepository } from "../../repository/interfaces/user.interface";
import { generateToken } from "../../utils/jwt";
import generateOtp, { generateOtpExpiry } from "../../utils/otp";
import { sendMail } from "../../utils/sendMail";
import { IUserService } from "../interfaces/user.interface";
import bcrypt from "bcrypt"

export class UserService implements IUserService{
    constructor(private _userRepository:IUserRepository,private _otpRepository:IOtpRepository){}

    async registerUser(email: string): Promise<void> {
      const existingUser=await this._userRepository.findByEmail(email)
      if(existingUser){
        throw new Error("User already registered")
      }
      const otp=generateOtp()
      const expiry=generateOtpExpiry()

      await this._otpRepository.saveOtp({
        email:email,
        otp:otp,
        expiresAt:expiry
      })

      await sendMail(email,otp)
  }

  async verifyOtp(
    data: IUser & { otp: string }
  ): Promise<{ user: IUser; token: string; }> {
    const otpRecord = await this._otpRepository.findOtpbyEmail(data.email);

    if (!otpRecord) throw new Error("OTP not found");

    if (otpRecord.otp !== data.otp) throw new Error("Invalid OTP");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this._userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    if(!user){
        throw new Error("user not found")
    }

    await this._otpRepository.deleteOtpbyEmail(data.email);

    const token = generateToken(user._id.toString(), user.email,);

    return { user:user, token, };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string; }> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Password");
    }
    const token = generateToken(user._id.toString(), user.email);
    return { user:user, token };
  }
}