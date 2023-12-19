import styles from "./index.module.css";
import SearchIcon from "@mui/icons-material/Search";

import React, { useEffect, useRef, useState } from "react";

import { basicLocationInfo, getLocDataOnLatAndLng } from "../../utils/location";
import { Merchant } from "../../@types/interfaces/merchant";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { validateIntializationMerchantInfo } from "../../utils/validation";
import { useAppDispatch, useAppSelector } from "../../store/store/store";
import { initializeMerchantInfo } from "../../store/reducer/user/action";
import { setAppLoading, setPopup } from "../../store/reducer/app-data";
import {
  addPlaceInstructions,
  placestypes,
} from "../../constants/app_constants";
import { stringAvatar } from "../../utils/Image";
import EditIcon from "@mui/icons-material/Edit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { remoteConfig, storage } from "../../firebase";
import { setImageUploading, setPlay } from "../../store/reducer/user";
import { colors } from "../../constants/colors";
import axios from "axios";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Lottie from "react-lottie";
import accountInfo from "../../assets/lottie/accountInfo.json";
import created from "../../assets/lottie/accountsetup.json";
import Footer from "../../components/Footer";
import { avatarStyles } from "../../components/Offer/commonStyles";
import { NavLink } from "react-router-dom";



const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: accountInfo,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

type Props = {};

const apiKey = process.env.REACT_APP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
const url = process.env.REACT_APP_PLACE_DETAILS

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const options = {
  types: ["establishment"],
  strictBounds: true,
  bounds: {
    south: 6.7559,
    west: 68.1624,
    north: 37.2719,
    east: 97.4024,
  },
};

export function getRefrencePicUrl(photoReference: string) {
  if (photoReference)
    return `https://dhhht6n2wd.execute-api.us-west-2.amazonaws.com/staging/place/photo?maxwidth=400&photoreference=${photoReference}`
}

export default function Account({ }: Props) {
  const { userInfo, isInitializing, play } = useAppSelector((state) => state.user);
  const { isInitialized, isAuth } = useAppSelector((state) => state.appData);
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
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleAvatarClick = () => {
    if (isAuth) {
      if (fileInputRef?.current) {
        fileInputRef?.current?.click();
      }
    } else {
      dispatch(
        setPopup({
          open: true,
          message: "Login to Upload Image.",
          severity: "error",
        })
      );
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
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    dispatch(setAppLoading(true));
    const place = autocomplete.getPlace();
      
    const locationInfo = basicLocationInfo(place);
    if (place?.place_id) {
      axios
        .get(url, {
          params: {
            place_id: place?.place_id,
          },
        })
        .then((response) => {
          setErrors({});
          setAddress({
            ...merchantInfo,
            ...locationInfo,
            place: place.name,
            place_id: place?.place_id,
            lat: place?.geometry?.location.lat(),
            lng: place?.geometry?.location.lng(),
            formatted_address: place?.formatted_address,
            rating: place?.rating ?? -1,
            photo_refrence:response.data.result?.photos.length>0?response.data.result.photos[0].photo_reference:null,
          });
        })
        .catch((err) => console.log(err)).finally(() => {
          dispatch(setAppLoading(false));
        });
    }

  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
      options
    );
    autocomplete.setFields([
      "address_component",
      "geometry",
      "name",
      "formatted_address",
      "place_id",
      "photos",
      "rating",
    ]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    setErrors({});
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = getLocDataOnLatAndLng(location, lat, lng);
        console.log(_address);
        setAddress({ ...merchantInfo, ..._address });
        searchInput.current.value = _address.formatted_address;
      })
      .catch((error) => {
        dispatch(
          setPopup({
            open: true,
            message: "Error while fetching Location.",
            severity: "error",
          })
        );
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  const onSubmitOld = () => {
    if (isAuth) {
      if (validateIntializationMerchantInfo(merchantInfo)) {
        const initInfo = { username: userInfo?.username, ...merchantInfo };
        dispatch(initializeMerchantInfo(initInfo));
      } else {
        if (!merchantInfo?.place)
          setErrors({ ...errors, place: "Place Required Parameter." });
        else if (!merchantInfo?.district)
          setErrors({ ...errors, district: "District Required Parameter." });
        else if (!merchantInfo?.formatted_address)
          setErrors({
            ...errors,
            formatted_address: "District Required Parameter.",
          });
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
        dispatch(
          setPopup({
            open: true,
            message: "Please check all details are filled.",
            severity: "error",
          })
        );
      }
    } else {
      dispatch(
        setPopup({
          open: true,
          message: "Please Login First",
          severity: "error",
        })
      );
    }
  };


  const inputStyle = {
    fontSize: '1.3rem',
    color: colors.black
  }

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  const handleSelectChange = (event) => {
    if (errors?.type) setErrors({ ...errors, type: undefined });
    setAddress({ ...merchantInfo, type: event.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploading(true);
      const imageRef = ref(
        storage,
        `merchant/${userInfo?.username}/${file.name}`
      );

      uploadBytes(imageRef, file)
        .then((response) => {
          console.log(response, response.metadata);
          getDownloadURL(ref(storage, response.metadata.fullPath))
            .then((url) => {
              console.log("getDownloadURL", url);
              setAddress({ ...merchantInfo, image: url ,place_image:url});
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              dispatch(setImageUploading(false));
            });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  return (
    <>
      <div className={styles.container}>
        {play && (
          <div className={styles.popper}>
            <Lottie
              options={createOptions}
              eventListeners={[
                {
                  eventName: "complete",
                  callback: () => {
                    console.log("Animation completed");
                    dispatch(setPlay(false));
                  },
                },
                {
                  eventName: "loopComplete",
                  callback: () => {
                    console.log("Loop completed");
                  },
                },
              ]}
            />
          </div>
        )}
        <div className={styles.innerContainer}>
          <h3>Instructions</h3>
          <div className={styles.lottie}>
            <Lottie options={defaultOptions} width={"100%"} height={"100%"} />
          </div>
          <ul className={styles.instructions}>
            {addPlaceInstructions.map((ele) => {
              return <li>{ele}</li>;
            })}
          </ul>
          <h3>If any issue then <span><NavLink to="/contact">Contact Us</NavLink></span></h3>
          <h4>Note : Once the Venue  is Initialized then you can't change it's location So please check twice before submit.</h4>
            
        </div>

        <div className={styles.innerContainer}>
          {!isInitialized && <div className={styles.search}>
            <span>
              <SearchIcon/>
            </span>
            <input
              ref={searchInput}
              type="text"
              placeholder="Search your location...."
            />
            {/* <button onClick={findMyLocation}><FaSearchLocation /></button> */}
          </div>}

          <div className={styles.uploadImage}>
            {merchantInfo?.place_image ? (
              <Avatar
                onClick={handleAvatarClick}
                alt={merchantInfo?.place || ""}
                sx={avatarStyles}
                src={merchantInfo?.image}
              />
            ) : merchantInfo?.photo_refrence?
            <Avatar
            onClick={handleAvatarClick}
            alt={merchantInfo?.place || ""}
            sx={avatarStyles}
            src={getRefrencePicUrl(merchantInfo?.photo_refrence)}
          />
            :merchantInfo?.image ? (
              <Avatar
                onClick={handleAvatarClick}
                alt={merchantInfo?.place || ""}
                sx={avatarStyles}
                src={merchantInfo?.image}
              />):(
              <Avatar
                onClick={handleAvatarClick}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  alignSelf: "center",
                }}
              >
                <FileUploadOutlinedIcon />
              </Avatar>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            {uploading && <CircularProgress size={16}  
              sx={{ position:"relative",zIndex:100,bottom:'50%',left:'45%'}} />}
            {!userInfo?.image && <p>Upload a picture</p>}
          </div>

          <div className={styles.searchContainer}>
          <TextField
            label="Place Name"
            value={merchantInfo?.place || ""}
            onChange={(e) => {
              setErrors({});
              setAddress({ ...merchantInfo, place: e.target.value });
            }}
            fullWidth
            margin="normal"
            error={!!errors.place}
            helperText={errors.place}
            InputProps={{
              style: {
                borderColor: errors.place ? "red" : "blue",
                width: "95%",
              },
            }}
            inputProps={{
              style: inputStyle
            }}
          />

          <TextField
            label="Owner's Name"
            value={merchantInfo?.name || ""}
            onChange={(e) => {
              setErrors({});
              setAddress({ ...merchantInfo, name: e.target.value });
            }}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              style: {
                borderColor: errors.name ? "red" : "blue",
                width: "95%",
              },
            }}
            inputProps={{
              style: inputStyle
            }}
          />
          </div>

          <div className={styles.inside}>
            <FormControl sx={{ minWidth: "50%" }}>
              <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={merchantInfo?.type || "Select"}
                label="Type"
                onChange={handleSelectChange}
                MenuProps={{
                  style: {
                    fontSize: '1.8rem', // Adjust the font size as needed
                    color: 'red', // Adjust the color as needed
                  },
                }}
                sx={{ fontSize: '1.4rem' ,width:'95%'}}
              >
                {placestypes?.map((item) => {
                  return (
                    <MenuItem key={item} value={item}
                      sx={{
                        fontSize: '1.4rem',
                        color: item === merchantInfo?.type ? 'red' : colors.black, // Customize the color for the selected item
                      }}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              label="City"
              disabled={isInitialized}
              value={merchantInfo?.district || ""}
              onChange={(e) => {
                if (errors?.district)
                  setErrors({ ...errors, district: undefined });
                setAddress({ ...merchantInfo, district: e.target.value });
              }}
              sx={{ width: "50%", paddingBottom: "1rem" }}
              margin="normal"
              error={!!errors.district}
              helperText={errors?.district}
              InputProps={{
                style: {
                  borderColor: errors.district ? "red" : "blue",
                  width:'95%'
                },
              }}
              inputProps={{
                style: inputStyle
              }}
            />
          </div>

          <div className={styles.inside}>
            <TextField
              label="Region"
              disabled={isInitialized}
              value={merchantInfo?.region || ""}
              onChange={(e) => {
                if (errors?.region) setErrors({ ...errors, region: undefined });
                setAddress({ ...merchantInfo, region: e.target.value });
              }}
              fullWidth
              margin="normal"
              error={!!errors?.region}
              helperText={errors?.region}
              InputProps={{
                style: {
                  borderColor: errors?.region ? "red" : "blue",
                  width: '95%'
                },
              }}
              inputProps={{
                style: inputStyle
              }}
            />

            <TextField
              label="State"
              disabled={isInitialized}
              value={merchantInfo?.state || ""}
              onChange={(e) => {
                if (errors?.state) setErrors({ ...errors, state: undefined });
                setAddress({ ...merchantInfo, state: e.target.value });
              }}
              fullWidth
              margin="normal"
              error={!!errors?.state}
              helperText={errors?.state}
              InputProps={{
                style: {
                  borderColor: errors?.state ? "red" : "blue",
                  width: '95%'
                },
              }}
              inputProps={{
                style: inputStyle
              }}
            />
          </div>

          <div className={styles.inside}>
            <TextField
              label="Country"
              disabled={isInitialized}
              value={merchantInfo?.country || ""}
              onChange={(e) => {
                if (errors?.country)
                  setErrors({ ...errors, country: undefined });
                setAddress({ ...merchantInfo, country: e.target.value });
              }}
              fullWidth
              margin="normal"
              error={!!errors?.country}
              helperText={errors?.country}
              InputProps={{
                style: {
                  borderColor: errors?.country ? "red" : "blue",
                  width: '95%'
                },
              }}
              inputProps={{
                style: inputStyle
              }}
            />

            <TextField
              label="Zip Code"
              disabled={isInitialized}
              value={merchantInfo?.postal_code || ""}
              onChange={(e) => {
                if (errors?.postal_code)
                  setErrors({ ...errors, postal_code: undefined });
                setAddress({ ...merchantInfo, postal_code: e.target.value });
              }}
              fullWidth
              margin="normal"
              error={!!errors?.zipcode}
              helperText={errors?.zipcode}
              InputProps={{
                style: {
                  borderColor: errors?.zipcode ? "red" : "blue",
                  width:'95%'
                },
              }}
              inputProps={{
                style: inputStyle
              }}
            />
          </div>

          <Button
            onClick={onSubmitOld}
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "20vw", marginBottom: 20, marginTop: 20,padding:'0.7rem',
            fontSize:'1.2rem' }}
          >
            Submit
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
