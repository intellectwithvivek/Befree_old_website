import React from 'react'
import { addPlaceInstructions, beFreeInformation } from '../../../constants/app_constants'
import styles  from  './team.module.css'

type Props = {}

export default function Team({}: Props) {
  return (
    <section className={styles.teamcontainer}>
        <h2>Meet the Team</h2>
        <div>
            <img alt='Akshay' 
                    src={'https://firebasestorage.googleapis.com/v0/b/befree-prod.appspot.com/o/me.jpg?alt=media&token=11b96282-7808-4be3-9aa0-182416ca7fe6'} 
                    width={300} height={300}/>
            <p>
                {beFreeInformation["Meet the Team"]?.content}
            </p>
        </div>
    </section>
  )
}