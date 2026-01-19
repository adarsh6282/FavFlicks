import {Router} from "express"
import { UserRepository } from "../repository/implementation/user.repository"
import { UserService } from "../services/implementation/user.services"
import { OtpRepository } from "../repository/implementation/otp.repository"
import { UserController } from "../controllers/implementation/user.controller"

const router=Router()

const userRepository=new UserRepository()
const otpRepository=new OtpRepository()
const userService=new UserService(userRepository,otpRepository)
const userController=new UserController(userService)

router.post("/register",userController.register.bind(userController))
router.post("/login",userController.loginUser.bind(userController))
router.post("/verify-otp",userController.verifyOtp.bind(userController))


export default router