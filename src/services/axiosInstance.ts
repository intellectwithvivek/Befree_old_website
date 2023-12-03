import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { auth } from "../firebase";
import { handleRefresh } from "./handleRefreshToken"; 
import { getAccesstokenStorage, savetokenStorage } from "../utils/storage";

interface CustomRequestConfig extends AxiosRequestConfig {
        headers: {
            Authorization: string;
            [key: string]: any;
        };
}

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    };
    
//
  export const axiosInstance = axios.create({
    // baseURL:"https://befree340.online", //"http://befreebeta-env.eba-qjt4qnff.ap-south-1.elasticbeanstalk.com",//"http://192.168.1.10:5000",//Config.BASE_URL,
    headers,
    withCredentials: true, // Enable credentials (cookies, HTTP authentication)
});



  axiosInstance.interceptors.request.use(async (request) => {
    if (request?.url && request.url.startsWith("/public/register")) 
         {
           const idTokenResult = await auth?.currentUser?.getIdTokenResult();
            if(idTokenResult)
            request.headers.Authorization = `Bearer ${idTokenResult.token}`;
        }
    else {
      
        const token  = getAccesstokenStorage();
        console.log("token",token)
        if (request?.url && request?.headers) {

          if (request.url.startsWith("/public/refreshToken")) {
            request.headers.Authorization = `Bearer ${token}`;
            request.headers.isRefreshToken = "true";
            }
         else if (request.url.startsWith("/private")) {
          console.log("dasdadsasdascxvxcvcvbctgf",token)
            request.headers.Authorization = `Bearer ${token}`;
            request.headers["Access-Control-Allow-Origin"] = "*"
            }
         else {
            throw new Error("Invalid URL");
            }
        }
    }
    
    console.log("asdasd",request.headers.Authorization)

    return request;
    });


     axiosInstance.interceptors.response.use(
      response => {
        return response  
      },
      async error => {
        const { config, response } = error;
        console.log(response,error)
        if (error === 'Network Error') {
         throw new Error('Network Error');
        } if (error.isAxiosError && error.code === 'ECONNABORTED') {
              // handle timeout error
            throw new Error('Request timed out. Please try again.');
        } else if (response && response.status === 401) {
          const token = getAccesstokenStorage()
          
          if (token) {
            try {
              const {token} = await handleRefresh();
              console.log("Token refresh ",token )
              savetokenStorage(token)
              const originalConfig = {
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: `Bearer ${token}`,
                },
              };
              return axiosInstance(originalConfig);
            } catch (error) {
              // handle error
            }
          } else {
            // Redirect to AuthLogin Screen
            // ...
          }
        }
        return Promise.reject(error);
      },
    );
    
