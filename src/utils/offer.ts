import { Offer } from "../@types/interfaces/offer";
import { discount_color, discount_styles } from "../constants/app_constants";
import { colors } from "../constants/colors";

export const subtitle = (offer: Offer) => {
  if (offer.minOrderType === "value") {
    if (offer.offer_type === "Discount") {
      if (offer.limit == "No Limit") return `Flat ${offer.discount}% `;
      else return `GET ${offer.discount}% ${offer.limit}`;
    } else if (offer.offer_type === "Complimentary") {
      return `GET ${offer.quantity} ${offer.complimentaryItem} on purchase off Rs. ${offer.minOrder}`;
    }
  } else if (offer.minOrderType === "quantity") {
    if (offer.offer_type === "Discount") {
      if (offer.limit == "No Limit")
        return `Flat ${offer.discount}% on buying ${offer.minOrder} item.`;
      else
        return `GET ${offer.discount}% ${offer.limit} on buying ${offer.minOrder} item.`;
    } else if (offer.offer_type === "Complimentary") {
      return `Buy ${offer.minOrder} & GET ${offer.quantity} ${offer.complimentaryItem}`;
    }
  }
};

export const getOfferColor = (discount: number) => {
  if (discount >= 10 && discount <= 60) {
    return discount_styles[discount].color;
  }
  else return colors.primary
};


export const getOfferFont = (discount: number) => {
  if (discount >= 10 && discount <= 60) {
    return discount_styles[discount].fontSize;
  }
  else return '1.5rem'
};
