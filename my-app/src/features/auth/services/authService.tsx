import { baseApi } from "../../../utils/shared/baseApi";
import { taskApi } from "../../tasks/services/taskApi";
import type { LoginRequest } from "../model/LoginRequest";
import type { LoginResponse } from "../model/LoginResponse";

export const AuthService = {

    //login api
    async login(username:string,password:string){
        const response = await baseApi.post(
        "/auth/login",
        {
            username,
            password
        }
      );

      return response.data
    },

    async me(){
        const resp = await baseApi.get("auth/me");
        return resp.data
    },

    async signup(username:string, email:string, password:string){
        const response = await baseApi.post(
        "/auth/signup",
        {
            username,
            email,
            password
        }
      );

      return response.data
    },
}