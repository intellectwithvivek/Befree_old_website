import React from "react"
import styles from './offer.module.css'
import discount from "../../assets/svg/discountoff.svg";
import complimentary from "../../assets/svg/complimetary.svg";
import { Offer_Types } from "../../constants/app_constants";

type headerProps = {
    title:string
}

export const OfferHeader=({title}:headerProps)=>{
       return(<h2 className={styles.header}>{title}</h2>)
}

type offertype={
    title:string,
    subtitle:string,
    eg:string
}

type offerTypes ={
    offerType:offertype
}

export const OfferType=({offerType}:offerTypes)=>{
        return(<div>
            <img src={offerType.title === Offer_Types?.DISCOUNT?.title?discount:complimentary}/>
            <div>
                <h4>{offerType?.title}</h4>
                <p>{offerType.subtitle}</p>
                <p>{offerType.eg}</p>
            </div>
        </div>)
}