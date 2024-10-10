import {
  Button,
  Card, CardContent,
  Switch,
  Typography
} from '@mui/material';
import React from 'react';
import { colors } from '../../constants/colors';
import { formatDate } from '../../utils/date';
import { getOfferColor, subtitle } from '../../utils/offer';

const labelStyle={}


const TrackOfferCard = ({ offer, onDelete, onEdit , onStatusUpdate}) => {


  const handleEdit = () => {
    onEdit(offer); // Pass the offer data to the edit handler
   
  };

  const handleDelete = () => {
    onDelete(offer); // Pass the offer ID to the delete handler
   
  };

  const handleStatusChange =(event)=>{
    console.log(event.target.checked);
      onStatusUpdate(offer.id,event.target.checked)
  }
  const cardStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Set your desired box shadow
    border: '1px solid #e0e0e0', // Set your desired border style
    marginBottom:'1rem',
    background: 'linear-gradient(to right, #f0f0f0, #b3c6e7)', // Set your gradient colors
    transition: 'transform 0.3s ease-in-out', // Add a smooth transition effect
    '&:hover': {
      transform: 'scale(1.05)', // Set the scale factor on hover
    },
    width:'25vw',
    '@media (max-width: 600px)': {
      width: '80vw', // Adjust the width for smaller screens
    },
  };


  return (
    <Card sx={[cardStyle,]}>
      <CardContent>
        <Typography variant="h5" 
              sx={{fontSize:'2.2rem',fontWeight:'500'}}
          color={offer.offer_type === 'Discount'?getOfferColor(offer.discount):colors.primary}>{offer.title}</Typography>
        <Typography variant="body1" color={colors.lightblue} 
            style={{fontWeight:'600',fontSize:'1.5rem',marginTop:'1rem'}}>
          [{subtitle(offer)}]
        </Typography>
        <Typography variant="body2" color={colors.focusColor} style={{fontWeight:'600',fontSize:'1.2rem'}}>
          {`Status : `}
          <Switch checked={offer.active} onChange={handleStatusChange} />
          {` `}
          <span style={{ color: offer.active ? 'green' : 'red'}}>
            {offer.active ? 'Active' : 'Inactive'}
          </span>
        </Typography>
        {offer.limit !== 'No Limit' && offer.offer_type === 'Discount' && (
          <Typography variant="body2" color={colors.focusColor} style={{fontWeight:'600',fontSize:'1.2rem'}}>MAX Discount :  <span style={{color:'green'}}>{offer.limit}</span></Typography>
        )}
        <Typography variant="body2" color={colors.focusColor} style={{fontWeight:'600',fontSize:'1.2rem'}}>Start Date : <span style={{color:'green'}}>{formatDate(offer.startDate)}</span></Typography>
        <Typography variant="body2" color={colors.focusColor} style={{fontWeight:'600',fontSize:'1.2rem'}}>Timing : <span style={{color:'green'}}>{offer.timing}</span></Typography>
        {offer.minOrderType === 'value' ? (
          <Typography variant="body2" style={{marginTop:10,marginBottom:10,fontWeight:'600',fontSize:'1rem',color:colors.greyText}}>Minimum Order of Rs. {offer.minOrder} to Avail this Offer</Typography>
        ):<Typography variant="body2" style={{fontWeight:'600',fontSize:'1rem',color:colors.greyText}}>Minimum Order {offer.minOrder} item to Avail this offer</Typography>}
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete} variant='text' color='warning'>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default TrackOfferCard;
