import axios, { AxiosResponse } from "axios";

import { RegisterResponse, Merchant } from "../../@types/interfaces/merchant";
import { axiosInstance } from "../axiosInstance";
import { getAccesstokenStorage } from "../../utils/storage";

function handleError(error: any): Promise<any> {
  console.error(error);
  return Promise.reject(error);
}

class UserDetailServices {
  public registerUser = (
    merchant: Merchant
  ): Promise<AxiosResponse<RegisterResponse>> =>
    axiosInstance.post("/public/registerMerchant", merchant);

  public initializeMerchant = (
    merchant: Merchant
  ): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.post("/private/merchant/merchantInfoInitialize", merchant);

  public getMerchantInfo = (
    username: string
  ): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.get(`/private/merchant/merchantInfo/${username}`);

  public verifyMerchantInfo = (
    merchant: Merchant
  ): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.post("/private/merchant/verify", merchant);

  public broadcast = (merchant: Merchant): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.post("/private/merchant/broadCastOffer", merchant);

  // public getMerchantInfo = (username: string): Promise<Response> => {
  //   return fetch(`/private/merchant/merchantInfo/${username}`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${getAccesstokenStorage()}`, // Replace with your token
  //     },
  //   })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json(); // You can also use response.text() or response.blob() depending on the expected response content type.
  //   });
  // }

  //------------ end -----------------------

  public updateProfilePic = (user: Merchant): Promise<AxiosResponse> =>
    axiosInstance.put("/private/merchant/updateImage", user);

  public savePushToken = (notifyData: any): Promise<AxiosResponse> =>
    axiosInstance.post("/private/merchant/savePushToken", notifyData);

  public refreshAccessToken = (): Promise<AxiosResponse> =>
    axiosInstance.get("/public/refreshToken");

  public getUserInfoByPhone = (
    phone: string
  ): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.get(`/private/merchant/tagInfo/${phone}`);

  public getUserInfoNormal = (
    username: string,
    access_token: string
  ): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.get(`/private/merchant/userInfo/${username}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

  public logoutUser = (username: string): Promise<AxiosResponse> =>
    axiosInstance.post(`/private/merchant/logout/${username}`);

  public saveUserLocationDetails = (
    locData: any
  ): Promise<AxiosResponse<any>> =>
    axiosInstance.post("/private/merchant/locationInfo", locData);

  public deleteUser = (
    username: string
  ): Promise<AxiosResponse<AxiosResponse>> =>
    axiosInstance.post(`/private/merchant/deleteUser/${username}`);

  public undeleteUser = (
    username: string
  ): Promise<AxiosResponse<AxiosResponse>> =>
    axiosInstance.post(`/private/merchant/undeleteUser/${username}`);

  public updateUserName = (
    username: string,
    name: string
  ): Promise<AxiosResponse<Merchant>> =>
    axiosInstance.post(`/private/merchant/userNameUpdate/${username}/${name}`);
}

export default new UserDetailServices();
