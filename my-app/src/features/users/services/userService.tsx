import { baseApi } from "../../../utils/shared/baseApi"

export const UserService = {

    async getAllUSers() {
        const resp = await baseApi.get("/users/getAllUsers");
        return resp.data;
    }
}