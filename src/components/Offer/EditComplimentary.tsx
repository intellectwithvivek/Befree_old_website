import { Autocomplete, CircularProgress, FormControlLabel, InputAdornment, Radio, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Offer } from '../../@types/interfaces/offer';
import { indianBeverages, indianSweets } from '../../constants/app_constants';
import { useAppSelector } from '../../store/store/store';
import { getCurrentDate } from '../../utils/date';
import { subtitle } from '../../utils/offer';
import { colors } from '../../constants/colors';
import { editHeading, lableStyle, subeditHead } from './commonStyles';

const predefinedOptions = ['Any Beverages', 'Any Sweet Dish', ...indianBeverages , ...indianSweets];

type Props={
    offer:Offer,
    onSubmit:(offerId:string,offer:Offer)=>void,
    onAbort:()=>void,
    saving:boolean
}

const EditComplimentaryForm = ({offer,onSubmit,onAbort,saving}:Props) => {
  const [complimentaryItem, setComplimentaryItem] = useState(offer.complimentaryItem);
  const [quantity, setQuantity] = useState(offer?.quantity);
  const [timing, setTiming] = useState(offer?.timing);
  const [startDate, setStartDate] = useState(offer?.startDate);
  const [minOrderType, setMinOrderType] = useState(offer.minOrderType);
  const [minOrder, setMinOrder] = useState(offer.minOrder); 
  const [errors, setErrors] = useState({});
 
  const {userInfo} = useAppSelector(state=>state.user)
  

  const handleMinOrderTypeChange = (event) => {
    setMinOrderType(event.target.value);

    // Reset the minimum order value when the type changes
    if(event.target.value === 'value')
    setMinOrder(150);
  else setMinOrder(1);
  };

  const handleMinOrderChange = (event) => {
    if(event.target.value>=0)
      setMinOrder(event.target.value);
  };

  const handleQuantityChange = (event) => {
    if(errors?.quantity)
      setErrors({...errors,quantity:undefined})
    if(event.target.value >=0)
    setQuantity(event.target.value);
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };

  const handleStartDateChange = (event) => {
    if(errors.startDate)
      setErrors({startDate:undefined})
    setStartDate(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedOffer = {
      title:"Complimentary " + complimentaryItem,
      complimentaryItem,
      quantity,
      startDate,
      timing,
      minOrderType,
      minOrder,
      active:true,
      offer_type:"Complimentary",
      id:offer.id
  } as Offer

  console.log("offer",updatedOffer)

    // Basic validation
    const newErrors = {};
    if (!complimentaryItem) {
      newErrors.complimentaryItem = 'Complimentary Item is required';
    }
    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (!startDate) {
      newErrors.startDate = 'Start Date is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Submit the form or perform other actions here
      onSubmit(offer.id,updatedOffer)
    
    } else {
      setErrors(newErrors);
    }
  };

  



  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
      <Typography variant="h4" align="center" sx={editHeading}>
            {offer.title}
          </Typography>
          <Typography variant="body2" align="center" color={colors.lightblue} 
            style={subeditHead}>
            [{subtitle(offer)}]
          </Typography>
        </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="complimentary" sx={lableStyle}>Complimentary Item</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
        <Autocomplete
              options={predefinedOptions}
              getOptionLabel={(option) => option}
              value={complimentaryItem}
              onChange={(event, newValue) => {
                if(errors?.complimentaryItem)
                  setErrors({...errors,complimentaryItem:undefined})
                setComplimentaryItem(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errors?.complimentaryItem?true:false}
                  label="Complimentary Item"
                  variant="outlined"
                  value={complimentaryItem}
                  onChange={event=>{
                    if(errors?.complimentaryItem)
                      setErrors({...errors,complimentaryItem:undefined})
                   setComplimentaryItem(event.target.value)
                  }}
                  helperText={errors?.complimentaryItem?"Complementary Item is Required.":null}
                />
              )}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="quantity" sx={lableStyle}>Quantity</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            error={errors?.quantity?true:false}
            helperText={errors?.quantity?errors?.quantity:undefined}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="timing" sx={lableStyle}>Timing</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Select
            value={timing}
            onChange={handleTimingChange}
          >
             <MenuItem value="All Day (24 hrs)">All Day (24 hrs)</MenuItem>
            <MenuItem value="Morning (7am - 12pm)">Morning (7 - 12)</MenuItem>
            <MenuItem value="Afternoon">Afternoon (12 - 4)</MenuItem>
            <MenuItem value="Evening (4pm - 8pm)">Evening (4 - 8)</MenuItem>
            <MenuItem value="Night (8pm - 12pm)">Night (8 - 12)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="startDate" sx={lableStyle}>Start Date</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={errors.startDate?true:false}
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: getCurrentDate() }, // Pass the minimum date
            }}
            helperText={errors.startDate?"Start Date is Required.":null}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="minOrderType" sx={lableStyle}>Minimum Order</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            aria-label="Minimum Order Type"
            name="minOrderType"
            value={minOrderType}
            onChange={handleMinOrderTypeChange}
          >
            <FormControlLabel
              value="value"
              control={<Radio />}
              label="Value"
            />
            <FormControlLabel
              value="quantity"
              control={<Radio />}
              label="Quantity"
            />
          </RadioGroup>
          {minOrderType === 'value' && (
            <TextField
              id="minOrder"
              type="number"
              label="Minimum Order (Rs.)"
              value={minOrder}
              onChange={handleMinOrderChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ₹
                  </InputAdornment>
                ),
              }}
            />
          )}
          {minOrderType === 'quantity' && (
            <TextField
              id="minOrder"
              type="number"
              label="Minimum Order Quantity"
              value={minOrder}
              onChange={handleMinOrderChange}
            />
          )}
          {errors.minOrder && <div>{errors.minOrder}</div>}
        </Grid>
      </Grid>
      {saving ? <div style={{textAlign:"center",marginTop:20,marginBottom:20}}>
          <CircularProgress size={20}/></div> :
      <div style={{textAlign:"center",marginTop:20,marginBottom:20}}>
        <Button type="button" variant="outlined" color="primary" onClick={onAbort} sx={{marginRight:10}}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        </div>}
    </form>
  );

 };

export default EditComplimentaryForm;
