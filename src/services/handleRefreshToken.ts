
import { RegisterResponse } from "../@types/interfaces/merchant";
import TokenServices from "./apis/tokenServices";

export const handleRefresh=async():Promise<RegisterResponse>=>{
    try {
      const {data} = await TokenServices.refreshTokenServices();
        return data
    } catch (error) {
      throw error
    }
        
  }