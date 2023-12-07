import { Merchant } from "../@types/interfaces/merchant";

const onlydigit = /^\d+$/;
const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const alphanumericRegexWithSpaces = /^[a-zA-Z0-9\s]+$/;

export const phoneValidator = (phone: string) => {
  return phone.length == 10 && onlydigit.test(phone);
};

export const otpValidator = (otp: string) => {
  return otp.length === 6 && onlydigit.test(otp);
};

export const alphaNumeric = (text: string) => {
  return text.match(/^[^a-zA-Z0-9]+$/) ? true : false;
};

export const validateMerchantInfo = (merchant: Merchant) => {
  if (
    merchant.username &&
    merchant.uid &&
    merchant.name &&
    merchant.district &&
    merchant.country &&
    merchant.division &&
    merchant.lat &&
    merchant.lng &&
    merchant.state &&
    merchant.formatted_address
  )
    return true;
  else return false;
};

export const validateIntializationMerchantInfo = (merchant: Merchant) => {
  if (
    merchant.type &&
    merchant.type != "Select" &&
    merchant.place &&
    merchant.district &&
    merchant.division &&
    merchant.country &&
    merchant.lat &&
    merchant.lng &&
    merchant.state &&
    merchant.formatted_address &&
    merchant.postal_code &&
    merchant.place_id
  )
    return true;
  else return false;
};

export function hasNoSpecialCharacters(text: string) {
  // Regular expression to match alphanumeric characters
  if (text) {
    // Test if the text contains only alphanumeric characters
    return alphanumericRegexWithSpaces.test(text);
  }
  return true;
}
