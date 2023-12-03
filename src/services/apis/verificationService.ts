import { AxiosResponse } from "axios";
import { RegisterResponse } from "../../@types/interfaces/merchant";
import { axiosInstance } from "../axiosInstance";

class VerificationServices {
    public sendOTP =(phone:string): Promise<AxiosResponse> =>
    axiosInstance.post(`/private/merchant/send-otp/${phone}`);

    public verifyOTP =(verification:any): Promise<AxiosResponse> =>
    axiosInstance.post('/private/merchant/verifyNumber',verification);
}


export default new VerificationServices();