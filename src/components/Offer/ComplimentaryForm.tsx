import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Autocomplete, CircularProgress, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { indianBeverages, indianSweets } from '../../constants/app_constants';
import { colors } from '../../constants/colors';
import { db } from '../../firebase';
import { setPopup } from '../../store/reducer/app-data';
import { useAppDispatch, useAppSelector } from '../../store/store/store';
import { generateUniqueString, getCurrentDate } from '../../utils/date';
import { label, timings } from './DiscountForm';
import styles from './offer.module.css'
import { subtitle } from '../../utils/offer';
import Lottie from 'react-lottie';
import offerAdded from '../../assets/lottie/offeradded.json';
import { inputStyle, primaryButton } from './commonStyles';
import userDetailsService from '../../services/apis/userDetailsService';

const predefinedOptions = ['Any Beverages', 'Any Sweet Dish', ...indianBeverages, ...indianSweets];


type Props = {
  onBack: () => void
}

const ComplimentaryForm = ({ onBack }: Props) => {
  const [complimentaryItem, setComplimentaryItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [timing, setTiming] = useState('All Day (24 hrs)');
  const [startDate, setStartDate] = useState('');
  const [minOrderType, setMinOrderType] = useState('value');
  const [minOrder, setMinOrder] = useState(150); // Changed variable name
  const [errors, setErrors] = useState({});

  const { userInfo } = useAppSelector(state => state.user)
  const offerCollection = collection(db, 'offers', userInfo?.country || '', userInfo?.state || '', userInfo?.division || '',userInfo?.district|| '',userInfo?.username || '','alloffers');
  const dispatch = useAppDispatch();
  const [adding, setAdding] = useState(false)
  const [play,setPlayAnimation] = useState(false);
  // const [options,]

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: offerAdded,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  

  const usernameRef = doc(db, 'offers', userInfo?.country || '', userInfo?.state || '', userInfo?.division || '', userInfo?.district || '',userInfo?.username || '');
  

  const handleDataSaveUpdated=(offerData)=>{
    if(offerData)
    {
      setAdding(true);
      getDoc(usernameRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document data is available
          const data = docSnapshot.data();
          console.log("Document data:", data);
          const currentOffers = data.offers || [];
         
          // Update the array with the new offer
          currentOffers.push(offerData);
    
          // Update the 'offers' field in the username document
          return updateDoc(usernameRef, { offers: currentOffers });
        } else {
          console.log("Document does not exist");
          return setDoc(usernameRef,{ offers: [offerData] })
        }
      }).then(async()=>{
        console.log('Document added successfully');
        await userDetailsService.broadcast({...userInfo,image:subtitle(offerData)});
        setTiming('All Day (24 hrs)');
        setStartDate('');
        dispatch(setPopup({ open: true, severity: "success", message: "Offer Added Successfully🥳" }));
        setPlayAnimation(true)
      })
      .catch((error) => {
        console.error("Error :", error);
        dispatch(setPopup({ open: true, severity: "error", message: "Something went Wrong!" }))
      }).finally(()=>{
        setAdding(false);
      });
    }
  }

  const handleDataSave = (data) => {
    // const docRef = doc(db, docRefrenc,);

    if (data) {
      setAdding(true)
      addDoc(offerCollection, data).then(async (response) => {
        //setting to original
        await userDetailsService.broadcast({...userInfo,image:subtitle(data)})
        setTiming('All Day (24 hrs)')
        setStartDate('')
        dispatch(setPopup({ open: true, severity: "success", message: "Offer Added Successfully🥳" }));
        setPlayAnimation(true);
      }).catch(err => 
          {
            dispatch(setPopup({ open: true, severity: "error", message: "Something went Wrong!" }))
            })
        .finally(() => {
          setAdding(false)
        });
    }
  }

  const handleMinOrderTypeChange = (event) => {
    setMinOrderType(event.target.value);

    // Reset the minimum order value when the type changes
    if (event.target.value === 'value')
      setMinOrder(150);
    else setMinOrder(1);
  };

  const handleMinOrderChange = (event) => {
    if (event.target.value >= 0)
      setMinOrder(event.target.value);
  };

  const handleQuantityChange = (event) => {
    if (errors?.quantity)
      setErrors({ ...errors, quantity: undefined })
    if (event.target.value >= 0)
      setQuantity(event.target.value);
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };

  const handleStartDateChange = (event) => {
    if (errors.startDate)
      setErrors({ startDate: undefined })
    setStartDate(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const offer = {
      title: "Complimentary " + complimentaryItem,
      complimentaryItem,
      quantity,
      startDate,
      timing,
      minOrderType,
      minOrder,
      active: true,
      offer_type: "Complimentary",
      place_type: userInfo?.type,
      id: generateUniqueString()
    }


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
      handleDataSaveUpdated(offer)
    } else {
      setErrors(newErrors);
    }
  };


  return (
    <> {play && <div className={styles.popper}>
      <Lottie
        options={defaultOptions}
        eventListeners={
          [
            {
              eventName: 'complete',
              callback: () => {
                console.log('Animation completed');
                setPlayAnimation(false)
              },
            },
            {
              eventName: 'loopComplete',
              callback: () => {
                console.log('Loop completed');
              },
            }]
        }
      />
    </div>}
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" color={colors.primary} style={{ marginTop: '0.5rem', marginBottom: '1.2rem' }}>
            <IconButton
              onClick={onBack}
              color="primary"
              aria-label="back"
              style={{
                backgroundColor: colors.veryLightBlue,
                padding: 5, borderRadius: 12, marginRight: 5
              }}>
              <ArrowBackIosIcon width={20} height={20} />
            </IconButton>
            Complimentry Based
          </Typography>
        </Grid>

        <div className={styles.main}>
          <div className={styles.container}>

            <div className={styles.box}>
              <InputLabel htmlFor="complimentary" style={label}>Complimentary Item</InputLabel>
              <div className={styles.input}>
                <Autocomplete
                  options={predefinedOptions}
                  getOptionLabel={(option) => option}
                  value={complimentaryItem}
                  onChange={(event, newValue) => {
                    if (errors?.complimentaryItem)
                      setErrors({ ...errors, complimentaryItem: undefined })
                    setComplimentaryItem(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors?.complimentaryItem ? true : false}
                      label="Complimentary Item"
                      variant="outlined"
                      value={complimentaryItem}
                      onChange={event => {
                        if (errors?.complimentaryItem)
                          setErrors({ ...errors, complimentaryItem: undefined })
                        setComplimentaryItem(event.target.value)
                      }}
                      helperText={errors?.complimentaryItem ? "Complementary Item is Required." : null}
                      
                      />
                  )}
                />
              </div>
            </div>


            <div className={styles.box}>
              <InputLabel htmlFor="quantity" style={label}>Quantity</InputLabel>
              <div className={styles.input}>
                <TextField
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  error={errors?.quantity ? true : false}
                  helperText={errors?.quantity ? errors?.quantity : undefined}
                  inputProps={{
                    style: inputStyle
                  }}
                />
              </div>

            </div>

            <div className={styles.box}>
              <InputLabel htmlFor="timing" style={label}>Timing</InputLabel>
              <div className={styles.input}>
                <Select
                  value={timing}
                  onChange={handleTimingChange}
                  MenuProps={{
                    style: {
                      fontSize: '1.8rem', // Adjust the font size as needed
                      color: 'red', // Adjust the color as needed
                    },
                  }}
                  sx={{ fontSize: '1.4rem' }}
                >
                  {timings?.map(item => {
                    return (<MenuItem
                      sx={{
                        fontSize: '1.4rem',
                        color: item.trim() === timing.trim() ? 'red' : colors.black, // Customize the color for the selected item
                      }}
                      value={item}>{item}</MenuItem>)
                  })}
                </Select>
              </div>
            </div>

            <div className={styles.box}>
              <InputLabel htmlFor="startDate" style={label}>Start Date</InputLabel>
              <div className={styles.input}>
                <TextField
                  error={errors.startDate ? true : false}
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
                  helperText={errors.startDate ? "Start Date is Required." : null}
                  inputProps={{
                    style: inputStyle
                  }}
                />

              </div>

            </div>

            <div className={styles.box}>
              <InputLabel htmlFor="minOrderType" style={label}>Minimum Order</InputLabel>
              <div className={styles.input}>
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
                    inputProps={{
                      style: inputStyle
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
                    inputProps={{
                      style: inputStyle
                    }}
                  />
                )}
                {errors.minOrder && <div>{errors.minOrder}</div>}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.3rem' }}>
              <Button type="submit" variant="contained"
                color="primary" disabled={adding} style={primaryButton}>
                {adding ? <CircularProgress size={16} color='inherit' /> : 'Submit'}
              </Button>
            </div>
          </div>

          <div className={styles.container}>
            <h3 className={styles.title}>Preview</h3>

            <div className={styles.cardContainer}>
              <div className={styles.preview}>
                <h4 style={{ fontSize: '2.2rem' }}>{subtitle({
                  complimentaryItem,
                  quantity,
                  startDate,
                  timing,
                  minOrderType,
                  minOrder,
                  offer_type: "Complimentary",
                })}</h4>
                <h4>Timing: {timing}</h4>
                <h4>Starts By: {startDate}</h4>

                {minOrderType === 'value' ? (
                  <h5>Minimum Order of Rs. {minOrder} to Avail this Offer</h5>
                ) : <h5>Minimum Order {minOrder} item to Avail this offer</h5>}
              </div>
            </div>
          </div>
        </div>

      </form></>

  );

};

export default ComplimentaryForm;
