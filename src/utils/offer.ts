import { Offer } from "../../@types/interfaces/offer"
import { discount_color } from "../constants/app_constants"

export  const subtitle=(offer:Offer)=>{
    if(offer.minOrderType === 'value'){
      if(offer.offer_type === "Discount"){
        if(offer.limit == 'No Limit')
          return `Flat ${offer.discount}% `
        else return `GET ${offer.discount}% ${offer.limit}`
      }
      else if(offer.offer_type === "Complimentary"){
          return `GET ${offer.quantity} ${offer.complimentaryItem} on purchase off Rs. ${offer.minOrder}`
      }
    }
    else if(offer.minOrderType === 'quantity') {
        if(offer.offer_type === 'Discount'){
            if(offer.limit == 'No Limit')
              return `Flat ${offer.discount}% on buying ${offer.minOrder} item.`
            else return `GET ${offer.discount}% upto ${offer.limit} on buying ${offer.minOrder} item.`
        }
        else if(offer.offer_type === "Complimentary"){
          return `Buy ${offer.minOrder} & GET ${offer.quantity} ${offer.complimentaryItem}`
      } 
    }
}

export const getOfferColor=(discount:number)=>{
    if(discount>=10 && discount<20){
        return discount_color[discount]
    }
    else if(discount>=10 && discount<20){
      return discount_color[discount]
    }
    else if(discount>=20 && discount<30){
      return discount_color[discount]
    }
    else if(discount>=30 && discount<40){
      return discount_color[discount]
    }
    else if(discount>=40 && discount<50){
      return discount_color[discount]
    }
    else if(discount>=50 && discount<60){
      return discount_color[discount]
    }
    else return discount_color[discount]
}