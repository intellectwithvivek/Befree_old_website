import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { colors } from '../../constants/colors';
import { Offer_Types } from '../../constants/app_constants';
import discount from "../../assets/svg/discountoff.svg";
import complimentary from "../../assets/svg/complimetary.svg";

const cardStyles = {
  // position: 'relative',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  margin: '2rem',
  width:'30rem',
  height:250,
  padding :'0.3rem',
  // backgroundColor: 'red',
};

const mediaStyles = {
  height: 150, // Customize the height as per your design
  width: '100%', // Stretch the image to the full width of the Card
};

const overlayStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};

type offertype={
  title:string,
  subtitle:string,
  eg:string
}

type offerTypes ={
  offerType:offertype,
  onSelect:()=>void
}

const OfferCard = ({ offerType,  onSelect }:offerTypes) => {
  const {title, subtitle,eg,} = offerType
  return (
    <Card sx={[cardStyles,{border:0.2,borderColor:colors.grey}]} onClick={onSelect}>
      <CardMedia
        component="img"
        sx={[mediaStyles,
          {objectFit:'contain',padding:'0.2rem'}]}
        image={offerType.title === Offer_Types.DISCOUNT?.title?discount:complimentary}
        title={title}
      />
{/* <img src={image} alt="Your Image" width={400} height={200}></img> */}

      <CardContent sx={{justifyContent:'center'
            ,padding:'0.3rem',marginTop:'1.2rem',}}>
        <div sx={overlayStyles}>
          <Typography variant="h4" component="div" color="textPrimary" sx={{color:colors.primary}}>
            {title}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{color:colors.lightblue}}>
            {subtitle}
          </Typography>
          <Typography variant="h6" color={colors.greyText} sx={{color:colors.grey}}>
            {eg}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
