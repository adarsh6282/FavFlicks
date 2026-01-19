import { api } from "./apiService"

export const registerS=async(email:string)=>{
    return await api.post("/register",{email})
}

export const sentOtp = async (
  userData: {name:string,email:string,password:string,confirmPassword:string},
  otp: string
) => {
  return await api.post(
    `/verify-otp`,
    {
      ...userData,
      otp,
    }
  );
};

export const loginS=async(email:string,password:string)=>{
    return await api.post("/login",{email,password})
}