import { IUser } from "../../models/interfaces/user.interface";
import { IUserRepository } from "../interfaces/user.interface";
import User from "../../models/implementation/user.model"

export class UserRepository implements IUserRepository{
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({email})
    }

    async createUser(data: Partial<IUser>): Promise<IUser | null> {
        return await User.create(data)
    }
}