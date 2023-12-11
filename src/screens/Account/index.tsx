
import styles from './index.module.css'
import SearchIcon from '@mui/icons-material/Search';

import React, { useEffect, useRef, useState } from 'react'

import { basicLocationInfo, getLocDataOnLatAndLng } from '../../utils/location';
import { Merchant } from '../../@types/interfaces/merchant';
import { Avatar, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { validateIntializationMerchantInfo } from '../../utils/validation';
import { useAppDispatch, useAppSelector } from '../../store/store/store';
import { initializeMerchantInfo } from '../../store/reducer/user/action';
import { setPopup } from '../../store/reducer/app-data';
import { addPlaceInstructions, placestypes } from '../../constants/app_constants';
import { stringAvatar } from '../../utils/Image';
import EditIcon from '@mui/icons-material/Edit';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from '../../firebase';
import { setImageUploading, setPlay } from '../../store/reducer/user';
import { colors } from '../../constants/colors';
import axios from 'axios';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Lottie from 'react-lottie';
import accountInfo  from '../../assets/lottie/accountInfo.json'
import created  from '../../assets/lottie/accountsetup.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: accountInfo,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };


type Props = {}


const apiKey = "AIzaSyCPeMZGBtqJzmbkNixvRP1V2nQyu1Ik3rk";
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

// load google map api js

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

const options = {
    types: ['establishment'],
    strictBounds: true,
    bounds: {
        south: 6.7559,
        west: 68.1624,
        north: 37.2719,
        east: 97.4024
    }
};


export default function Account({ }: Props) {
    const { userInfo, isInitializing , play} = useAppSelector(state => state.user)
    const { isInitialized, isAuth } = useAppSelector(state => state.appData)
    const searchInput = useRef(null);
    const [merchantInfo, setAddress] = useState(userInfo) as Merchant | any;
    const [errors, setErrors] = useState({});
    const dispatch = useAppDispatch();
    const fileInputRef = useRef();
    const [uploading, setUploading] = useState(false);
   
    const createOptions = {
        loop: false,
        autoplay: true,
        animationData: created,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        },
      };
    

    const handleAvatarClick = () => {
        if (isAuth) {
            if (fileInputRef?.current) {
                fileInputRef?.current?.click();
            }
        }
        else {
            dispatch(setPopup({
                open: true,
                message: "Login to Upload Image.",
                severity: "error"
            }))
        }
    };

    // init gmap script
    const initMapScript = () => {
        // if script already loaded
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places`;
        return loadAsyncScript(src);
    }

    // do something on address change
    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();

        const locationInfo = basicLocationInfo(place)
        console.log("locationInfo", locationInfo)
        setErrors({})
        setAddress({
            ...merchantInfo,
            ...locationInfo,
            place: place.name,
            place_id: place?.place_id,
            lat: place?.geometry?.location.lat(),
            lng: place?.geometry?.location.lng(),
            formatted_address: place?.formatted_address,
            rating: place?.rating ?? -1
        });
    }

    // init autocomplete
    const initAutocomplete = () => {
        if (!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current, options);
        autocomplete.setFields(["address_component", "geometry", "name", "formatted_address", "place_id", "photos", "rating"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

    }


    const getPlacedetails = () => {
        // 'key=AIzaSyCPeMZGBtqJzmbkNixvRP1V2nQyu1Ik3rk'
        // const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=photos&place_id=ChIJZxzrmCO25zsRJUTEco_Lj6Y&?key=${apiKey}`;
        // searchInput.current.value = "Getting your location...";
        // setErrors({})
        const url = "https://us-central1-befree-prod.cloudfunctions.net/getPlaceDetails"
        axios.get(url, {
            params: {
                place_id: 'ChIJZxzrmCO25zsRJUTEco_Lj6Y'
            }
        }).then(response => console.log(response.data.result)).catch(err => console.log(err))

        // const getData = httpsCallableFromURL(
        //     functions,
        //     // the URL of the function
        //     url
        //   );
        //   console.log("dafada")
        //   getData()
        //     .then((result) => {
        //         // Read result of the Cloud Function.
        //         const data = result.data;
        //         console.log(data);
        //         // const sanitizedMessage = data.text;
        //     }).catch(err=>console.log(err));
    }

    const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
        setErrors({})
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                const _address = getLocDataOnLatAndLng(location, lat, lng);
                console.log(_address)
                setAddress({ ...merchantInfo, ..._address });
                searchInput.current.value = _address.formatted_address;
            }).catch(error => {
                dispatch(setPopup({
                    open: true,
                    message: "Error while fetching Location.",
                    severity: "error"
                }));
            })
    }



    const findMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                reverseGeocode(position.coords)
            })
        }
    }

    const onSubmitOld = () => {
        console.log(userInfo)
        if (isAuth) {
            if (validateIntializationMerchantInfo(merchantInfo)) {
                const initInfo = { username: userInfo?.username, ...merchantInfo }
                dispatch(initializeMerchantInfo(initInfo))
            }
            else {
                if (!merchantInfo?.place)
                    setErrors({ ...errors, place: "Place Required Parameter." });
                else if (!merchantInfo?.district)
                    setErrors({ ...errors, district: "District Required Parameter." });
                else if (!merchantInfo?.formatted_address)
                    setErrors({ ...errors, formatted_address: "District Required Parameter." });
                else if (!merchantInfo?.type)
                    setErrors({ ...errors, type: "Type Required Parameter." });
                else if (!merchantInfo?.division)
                    setErrors({ ...errors, division: "Division Required Parameter." });
                else if (!merchantInfo?.region)
                    setErrors({ ...errors, region: "Region Required Parameter." });
                else if (!merchantInfo?.state)
                    setErrors({ ...errors, state: "State Required Parameter." });
                else if (!merchantInfo?.postal_code)
                    setErrors({ ...errors, postal_code: "Zip-Code Required Parameter." });
                // alert("Please check all details are filled?")
                dispatch(setPopup({
                    open: true,
                    message: "Please check all details are filled.",
                    severity: "error"
                }))
            }
        }
        else {
            dispatch(setPopup({
                open: true,
                message: "Please Login First",
                severity: "error"
            }))
        }
    }

    const getDetails = () => {
        axios.get()
            .then(res => {
                console.log(res.data)
            }).catch(err => console.log(err))
    }


    const onSubmit = () => {
        console.log(userInfo)
        if (isAuth) {

            if (validateIntializationMerchantInfo(merchantInfo)) {
                axios.get('/place/details/json?place_id=ChIJZxzrmCO25zsRJUTEco_Lj6Y').then(response => {
                    const result = response?.data?.result

                    const photo_refrences = result?.photos ? result.photos.map(photo => photo.photo_reference) : []

                    if (photo_refrences?.length > 0) {
                        const initInfo = {
                            username: userInfo?.username,
                            photo_refrence: photo_refrences[0],
                            ...merchantInfo
                        }
                        dispatch(initializeMerchantInfo(initInfo))
                    }
                    else {
                        const initInfo = { username: userInfo?.username, ...merchantInfo }
                        dispatch(initializeMerchantInfo(initInfo))
                    }
                }).catch(err => console.log(err))

            }
            else {
                if (!merchantInfo?.place)
                    setErrors({ ...errors, place: "Place Required Parameter." });
                else if (!merchantInfo?.district)
                    setErrors({ ...errors, district: "District Required Parameter." });
                else if (!merchantInfo?.formatted_address)
                    setErrors({ ...errors, formatted_address: "District Required Parameter." });
                else if (!merchantInfo?.type)
                    setErrors({ ...errors, type: "Type Required Parameter." });
                else if (!merchantInfo?.division)
                    setErrors({ ...errors, division: "Division Required Parameter." });
                else if (!merchantInfo?.region)
                    setErrors({ ...errors, region: "Region Required Parameter." });
                else if (!merchantInfo?.state)
                    setErrors({ ...errors, state: "State Required Parameter." });
                else if (!merchantInfo?.postal_code)
                    setErrors({ ...errors, postal_code: "Zip-Code Required Parameter." });
                // alert("Please check all details are filled?")
                dispatch(setPopup({
                    open: true,
                    message: "Please check all details are filled.",
                    severity: "error"
                }))
            }
        }
        else {
            dispatch(setPopup({
                open: true,
                message: "Please Login First",
                severity: "error"
            }))
        }
       
    }

    // load map script after mounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, []);

    const handleSelectChange = (event) => {
        if (errors?.type)
            setErrors({ ...errors, type: undefined })
        setAddress({ ...merchantInfo, type: event.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUploading(true)
            const imageRef = ref(storage, `merchant/${userInfo?.username}/${file.name}`);

            uploadBytes(imageRef, file).then((response) => {
                console.log(response, response.metadata)
                getDownloadURL(ref(storage, response.metadata.fullPath))
                    .then((url) => {
                        console.log("getDownloadURL", url)
                        setAddress({ ...merchantInfo, image: url })

                    }).catch(err => {
                        console.log(err)
                    }).finally(() => {
                        dispatch(setImageUploading(false))
                    })
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setUploading(false)
            });
        }
    };

    return (
        <div className={styles.container}>

{play && <div className={styles.popper}>
      <Lottie
        options={createOptions}
        eventListeners={
          [
            {
              eventName: 'complete',
              callback: () => {
                console.log('Animation completed');
                dispatch(setPlay(false))
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
            <div className={styles.innerContainer}>
                <h3>Instructions</h3>
                <div className={styles.lottie}>
                    <Lottie
                    options={defaultOptions}
                    width={'100%'}
                    height={'100%'}
                    />
                </div>
                <ul className={styles.instructions}>
                        {addPlaceInstructions.map(ele=>{
                           return( <li>{ele}</li>)
                        })}
                </ul>
            </div>

            <div className={styles.innerContainer}>

                <div className={styles.search}>
                    <span><SearchIcon /></span>
                    <input ref={searchInput} type="text" placeholder="Search your location...." />
                    {/* <button onClick={findMyLocation}><FaSearchLocation /></button> */}
                </div>

                <div>
                    {merchantInfo?.image ?
                        <Avatar
                            onClick={handleAvatarClick}
                            alt={merchantInfo?.place || ''}
                            sx={{
                                width: 140, height: 140,
                                borderRadius: 10, backgroundColor: colors.greyText, alignSelf: 'center'
                            }}
                            src={merchantInfo?.image} /> :
                        <Avatar onClick={handleAvatarClick}
                            sx={{ width: 100, height: 100, borderRadius: '50%', alignSelf: 'center' }}>
                            <FileUploadOutlinedIcon />
                        </Avatar>}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    {uploading && <CircularProgress size={16} />}
                    <p>upload a picture</p>
                </div>


                <TextField
                    label="Place Name"
                    value={merchantInfo?.place || ''}
                    onChange={(e) => {
                        setErrors({})
                        setAddress({ ...merchantInfo, place: e.target.value })
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.place}
                    helperText={errors.place}
                    InputProps={{
                        style: {
                            borderColor: errors.place ? 'red' : 'blue',
                            width: '100%'
                        },
                    }}
                />

                <TextField
                    label="Owner's Name"
                    value={merchantInfo?.name || ''}
                    onChange={(e) => {
                        setErrors({})
                        setAddress({ ...merchantInfo, name: e.target.value })
                    }}
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                        style: {
                            borderColor: errors.name ? 'red' : 'blue',
                            width: '100%'
                        },
                    }}
                />


                <div className={styles.inside}>
                    <FormControl sx={{  minWidth: '48vh' }}>
                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={merchantInfo?.type || 'Select'}
                            label="Type"
                            onChange={handleSelectChange}
                        >
                            {placestypes?.map(item => {
                                return (<MenuItem key={item} value={item}>{item}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <TextField
                        label="City"
                        value={merchantInfo?.district || ''}
                        onChange={(e) => {
                            if (errors?.district) setErrors({ ...errors, district: undefined })
                            setAddress({ ...merchantInfo, district: e.target.value })
                        }}
                        sx={{ width: '50vh',paddingBottom:'1rem' }}
                        margin="normal"
                        error={!!errors.district}
                        helperText={errors?.district}
                        InputProps={{
                            style: {
                                borderColor: errors.district ? 'red' : 'blue',
                            },
                        }}
                    />
                </div>

                <div className={styles.inside}>
                    <TextField
                        label="Region"
                        value={merchantInfo?.region || ''}
                        onChange={(e) => {
                            if (errors?.region) setErrors({ ...errors, region: undefined })
                            setAddress({ ...merchantInfo, region: e.target.value })
                        }}
                        fullWidth
                        margin="normal"
                        error={!!errors?.region}
                        helperText={errors?.region}
                        InputProps={{
                            style: {
                                borderColor: errors?.region ? 'red' : 'blue',
                            },
                        }}
                    />

                    <TextField
                        label="State"
                        value={merchantInfo?.state || ''}
                        onChange={(e) => {
                            if (errors?.state) setErrors({ ...errors, state: undefined })
                            setAddress({ ...merchantInfo, state: e.target.value })
                        }}
                        fullWidth
                        margin="normal"
                        error={!!errors?.state}
                        helperText={errors?.state}
                        InputProps={{
                            style: {
                                borderColor: errors?.state ? 'red' : 'blue',
                            },
                        }}
                    />
                </div>

                <div className={styles.inside}>
                    <TextField
                        label="Country"
                        value={merchantInfo?.country || ''}
                        onChange={(e) => {
                            if (errors?.country) setErrors({ ...errors, country: undefined })
                            setAddress({ ...merchantInfo, country: e.target.value })
                        }}
                        fullWidth
                        margin="normal"
                        error={!!errors?.country}
                        helperText={errors?.country}
                        InputProps={{
                            style: {
                                borderColor: errors?.country ? 'red' : 'blue',
                            },
                        }}
                    />

                    <TextField
                        label="Zip Code"
                        value={merchantInfo?.postal_code || ''}
                        onChange={(e) => {
                            if (errors?.postal_code) setErrors({ ...errors, postal_code: undefined })
                            setAddress({ ...merchantInfo, postal_code: e.target.value })
                        }
                        }
                        fullWidth
                        margin="normal"
                        error={!!errors?.zipcode}
                        helperText={errors?.zipcode}
                        InputProps={{
                            style: {
                                borderColor: errors?.zipcode ? 'red' : 'blue',
                            },
                        }}
                    />
                </div>

                <Button
                            onClick={onSubmit}
                            type="submit" variant="contained" color="primary"
                            style={{ width: '30ch', marginBottom: 20, marginTop: 20 }}>
                            Submit
                        </Button>
            </div>
        </div>
    )
}