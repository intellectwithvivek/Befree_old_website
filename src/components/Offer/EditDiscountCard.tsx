import { CircularProgress, FormControlLabel, InputAdornment, Radio, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Offer } from '../../@types/interfaces/offer';
import { colors } from '../../constants/colors';
import { getCurrentDate } from '../../utils/date';
import { getOfferColor, subtitle } from '../../utils/offer';
import { editHeading, lableStyle, subeditHead } from './commonStyles';


type Props={
    offer:Offer,
    onSubmit:(offerID,offer:Offer)=>void,
    onAbort:()=>void,
    saving:boolean
}

const limits = ['No Limit','Upto 50','Upto 75' ,'Upto 100','Upto 150']

const EditDiscountForm = ({offer,onSubmit,onAbort,saving}:Props) => {
  const [discount, setDiscount] = useState(offer.discount || 10);
  const [maxCap, setMaxCap] = useState(offer.limit || 'No Limit');
  const [timing, setTiming] = useState(offer.timing || 'All Day');
  const [startDate, setStartDate] = useState(offer.startDate);
  const [minOrderType, setMinOrderType] = useState(offer.minOrderType);
  const [minOrder, setMinOrder] = useState(offer.minOrder); // Changed variable name
  
  const [errors, setErrors] = useState({});
  const [customMaxCap, setCustomMaxCap] = useState(''); // To store the custom max cap value
  const [isCustomMaxCapDialogOpen, setCustomMaxCapDialogOpen] = useState(false);
  const [capValues,setCapValues] = useState(limits?.includes('Upto '+offer?.limit) || offer.limit!='No Limit'?limits:[...limits,'Upto ' +offer?.limit])

 
  const handleMinOrderTypeChange = (event) => {
    setMinOrderType(event.target.value);

    // Reset the minimum order value when the type changes
    if(event.target.value === 'value')
    setMinOrder(150);
  else setMinOrder(1);
  };

  const handleMinOrderChange = (event) => {
    setMinOrder(event.target.value);
  };

  const handleDiscountChange = (event, newValue) => {
    setDiscount(newValue);
  };

  const handleMaxCapChange = (event) => {
    const selectedMaxCap = event.target.value;
    if (selectedMaxCap === 'Add your own') {
      setCustomMaxCapDialogOpen(true);
    } else {
      setMaxCap(selectedMaxCap);
    }
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);

  };

  const handleStartDateChange = (event) => {
    if(errors.startDate)
        setErrors({startDate:undefined})
    setStartDate(event.target.value);
  };


  const handleCustomMaxCapDialogClose = () => {
    setCustomMaxCapDialogOpen(false);
  };

  useEffect(()=>{
        if(customMaxCap && capValues.length>5){
                setMaxCap(capValues[capValues.length-1])
                setCustomMaxCap('')
        }
  },[capValues])

  const handleCustomMaxCapSave = () => {
    if (customMaxCap) {
        setCapValues(prevState=>[...prevState,'Upto '+ customMaxCap])
      setCustomMaxCapDialogOpen(false);
    }
  };

  const handleUpdateSave = (offerId,updatedOffer)=>{
      // const docRef = doc(db, docRefrenc,);
      // const docRef = doc(db, `/offers/country/division/state/city/${userInfo.username}/alloffers`, offerId);

      // updateDoc(docRef, {active:status})
      //   .then(() => {
      //     console.log('Document updated successfully');
      //     const updatedData = offers.map((offer) => {
      //       if(offer.id == offerID){
      //           return({
      //               ...offer,
      //               active:status
      //           })
      //       }
      //       else return offer;
      //           })
      //     console.log("updatedData",updatedData);

      //     setOffers(updatedData);
      //   })
      //   .catch((error) => {
      //     console.error('Error updating document:', error);
      //   })
      
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation

    const updatedoffer = {
        title:discount + " % Off ",
        discount,
        startDate,
        timing,
        minOrder,
        minOrderType,
        limit:maxCap,
        active:true,
        offer_type:"Discount",
        id:offer.id
    } as Offer

    console.log("Offer",offer)

      const newErrors = {};
      if (discount < 10 || discount > 60) {
        newErrors.discount = 'Discount must be between 10% and 60%';
      }
      if (minOrder < 0) {
        newErrors.minOrder = 'Minimum order value cannot be negative';
      }
      if (!startDate) {
        newErrors.startDate = 'Start Date is required';
      }
      console.log(newErrors)
      if (Object.keys(newErrors).length === 0) {
        // Submit the form or perform other actions here
        
        onSubmit(offer.id,updatedoffer)
      }
      else {
        setErrors(newErrors);
      }
  };


  return (
    <form onSubmit={handleSubmit} >
      <Grid item xs={12}>
          <Typography variant="h4" align="center" color={colors.primary} style={editHeading}>
            {offer.title}
          </Typography>
          <Typography variant="body2" align="center" color={colors.lightblue} style={subeditHead}>
            {subtitle(offer)}
          </Typography>
        </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="discount"  sx={lableStyle}>Discount (%)</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Slider
            value={discount}
            min={10}
            max={60}
            step={5}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            onChange={handleDiscountChange}
          />
          <Typography variant='h4' color={getOfferColor(discount)}>{discount }%</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="maxCap"  sx={lableStyle}>Maximum Upto</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Select
            value={maxCap}
            onChange={handleMaxCapChange}>
            {capValues?.map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
            <MenuItem value="Add your own">Add your own</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="timing"  sx={lableStyle}>Timing</InputLabel>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Select
            value={timing}
            onChange={handleTimingChange}>
            <MenuItem value="All Day (24 hrs)">All Day (24 hrs)</MenuItem>
            <MenuItem value="Morning (7am - 12pm)">Morning (7 - 12)</MenuItem>
            <MenuItem value="Afternoon">Afternoon (12 - 4)</MenuItem>
            <MenuItem value="Evening (4pm - 8pm)">Evening (4 - 8)</MenuItem>
            <MenuItem value="Night (8pm - 12pm)">Night (8 - 12)</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="startDate"  sx={lableStyle}>Start Date</InputLabel>
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
          {/* {errors.startDate && <Typo>{errors.startDate}</div>} */}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="minOrderType"  sx={lableStyle}>Minimum Order</InputLabel>
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
      <div style={{display:'flex',flexDirection:'row',
            alignItems:'center',justifyContent:'space-around',marginTop:20,marginBottom:20}}>
      <Button type="button" variant="outlined" color="primary" onClick={onAbort}>
        Cancel
      </Button>
      <Button type="submit" variant="contained" color="info">
        Submit
      </Button></div>}

      <Dialog open={isCustomMaxCapDialogOpen} onClose={handleCustomMaxCapDialogClose}>
        <DialogContent>
          <TextField
            label="Custom Max Cap"
            type="number"
            value={customMaxCap}
            onChange={(e) => setCustomMaxCap(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
         
            <Button onClick={handleCustomMaxCapDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCustomMaxCapSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default EditDiscountForm;
