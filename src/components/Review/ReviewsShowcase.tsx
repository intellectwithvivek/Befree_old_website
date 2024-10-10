import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Avatar } from '@mui/material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from'./ReviewShowCase.module.css'; // Import a CSS file for additional styling
import { stringAvatar } from '../../utils/Image';
import { colors } from '../../constants/colors';

const ReviewsShowcase = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // Auto-scroll interval (e.g., 5000 milliseconds for 5 seconds)

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className={styles.reviewsContainer}>
      <IconButton onClick={handlePrev} className={styles.arrowIconLeft}>
          <ChevronLeft style={{width:30,height:30}}/>
        </IconButton>
      <div className={styles.reviewsWrapper}>
        
        <div className={styles.reviewsSlider} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.reviewCard}>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center',padding:5}}>
                <Avatar {...stringAvatar(review.name)} 
                        src={require(`../../assets/images/${review.image}`)}
                        sx={{width:60,height:60}}/>

                <div style={{marginLeft:5}}>
                  <Typography variant="h6" gutterBottom 
                        style={{color:colors.black,fontSize:14,fontWeight:'500'}}>
                      {review.name}
                  </Typography>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <LocationOnIcon sx={{marginTop:'-5px',color:colors.grey}}/>
                      <Typography variant="h6" gutterBottom 
                                  sx={{color:colors.grey,fontSize:14,fontWeight:'500'}}>
                          {review.location}
                      </Typography>
                  </div>
                </div>

              </div>
              <Typography variant="h5" gutterBottom style={{color:colors.primary,fontWeight:'600'}}>
                {review.title}
              </Typography>
              <Typography variant="h6" style={{color:colors.grey,fontWeight:'500',fontSize:14}}>{review.review}</Typography>
            </div>
          ))}
        </div>
       
      </div>
      <IconButton onClick={handleNext} className={styles.arrowIconRight}>
          <ChevronRight style={{width:30,height:30}} />
      </IconButton>
    </div>
  );
};

export default ReviewsShowcase;
