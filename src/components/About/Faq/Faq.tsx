import React from 'react'
import styles from './Faq.module.css'
import { beFreeInformation } from '../../../constants/app_constants'



const Faq = () => {
const content = beFreeInformation["What Sets Us Apart?"].content
  return (
    <section className={styles.faq}>
      <h2>What Sets Us Apart? 🧐</h2>
      <div className={styles.faqs}>
        {content.map(item => {
          return (<div className={styles.faqCard}>
            <img src={item.url} 
              width={150} height={150}/>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>)
        })}</div>
    </section>
  )
}

export default Faq