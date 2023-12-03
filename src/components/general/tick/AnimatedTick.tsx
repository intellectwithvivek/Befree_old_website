import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from './AnimatedTick.module.css'

function AnimatedTick({msg}) {
  return (
    <div className={styles.animated_tick_container}>
      <FaCheckCircle className={styles.tick_icon} color='green' />
      <p style={{fontFamily:'inherit',fontSize:16,marginLeft:10}}>{msg}</p>
    </div>
  );
}

export default AnimatedTick;
