import React, { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material'; // Import Material-UI icons
import { colors } from '../../constants/colors';
import { Avatar, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';


const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const screen_shoots_images = [1,2,3,4,5,6,7,,8]


  const goToPreviousSlide = () => {
    if(currentImageIndex === 0)
    setCurrentImageIndex(6)
  else setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? screen_shoots_images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    if(currentImageIndex === 6)
      setCurrentImageIndex(0)
    else setCurrentImageIndex((prevIndex) => (prevIndex === screen_shoots_images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',
      }}>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <button style={{marginRight:5}} onClick={goToPreviousSlide}>
          <ArrowBack />
        </button>
        <div style={{width:'60%',height:isMobile?'40%':'2%'}}>
          {screen_shoots_images.map((image, index) => (
            <img
              key={index}
              src={require(`../../assets/screenshoots/${image}.png`)}
              alt={`Slide ${index}`}
              style={{ display: index === currentImageIndex ? 'block' : 'none',width:'100%',height:'100%' }}
            />
          ))}
        </div>
       
        <button style={{marginLeft:5}}  onClick={goToNextSlide}>
          <ArrowForward/>
        </button>
      </div>
      <div style={{display:'flex',
      flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        {screen_shoots_images.map((_, index) => (
          <span
            key={index}
            style={index === currentImageIndex ? {width:14,height:14,borderRadius:7,backgroundColor:colors.primary} : 
            {width:10,height:10,borderRadius:7,backgroundColor:colors.brand30Percent,
              borderWidth:1,borderColor:colors.mediumGrey}}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
