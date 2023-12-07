import { AxiosResponse } from "axios";
import { RegisterResponse } from "../../@types/interfaces/merchant";
import { axiosInstance } from "../axiosInstance";

class TokenServices {
  public refreshTokenServices = (): Promise<AxiosResponse<RegisterResponse>> =>
    axiosInstance.get("/public/refreshToken");
}

export default new TokenServices();
