export interface Merchant {
    id?: number;
    username?: string;
    role?: string;
    uid?: string;
    email?: string;
    phone?: string;
    name?: string;
    signvia?: string;
    type?: string;
    password?:string;
    enable?:boolean;
    image?:string;
    district?:string;
	division?:string;
	region?:string;
	state?:string;
	country?:string;
	postal_code?:string;
	formatted_address?:string;
	place_id?:string;
	lat?:string;
	lng?:string;
	verified?:boolean;
  place_image?:string
  }

  export interface RegisterResponse {
    token:string,
    merchant:Merchant
  }  
 

  interface GoogleUserInfo {
    displayName: string | null
    email: string | null
    phoneNumber: string | null
    photoURL: string | null
    providerId: string ,
    uid:string
}

  interface AdditionalUserInfo  { isNewUser: boolean; profile: Object | null; providerId: string; username?: string | null }
  
  export interface GoogleUser  {
    displayName: string | null;
    email: string | null;
    emailVerified:boolean;
    isAnonymous:boolean;
    metadata:any;
    multiFactor:any
    phoneNumber:string | null;
    photoURL: string | null;
    providerData: GoogleUserInfo[];
    providerId:string;
    refreshToken:string;
    tenantId:string | null;
    uid:string;
  }

  export interface userCredentials { 
                      additionalUserInfo?: AdditionalUserInfo | null;
                      credential: any | null;
                      operationType?: string | null; 
                      user: GoogleUser | null }