import React from 'react'
import video from '../../assets/video/bgvideoshort.mp4'
import styles from './index.module.css'
import apple from "../../assets/svg/apple.svg";
import android from "../../assets/svg/android.svg";
import logo from "../../assets/svg/logowhite.svg";
import { colors } from '@mui/material';


type Props = {}

export default function Download({ }: Props) {

    const openLinkInNewPage = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className={styles.main}>
            <video src={video} autoPlay loop muted />

            <div className={styles.content}>
                <div style={{ flexDirection: 'row', marginRight: '2rem', display: 'flex' }}>
                    <img
                        src={logo}
                        alt="logo"
                        className={styles.logo}
                    />
                    <h1>BeFree</h1>
                </div>
                <h3>Plan <span style={{ color: colors.pink[100] }}>Events❤️‍🔥</span> , Explore <span style={{ color: colors.pink[200] }}>Offers🥳</span> & Connect with Nearby <span style={{ color: colors.pink[300] }}>Users</span>🤝.</h3>
                <div className={styles.download}>
                    <img
                        src={apple}
                        alt="apple"
                        onClick={() =>
                            openLinkInNewPage(
                                "https://apps.apple.com/in/app/befree/id6463606840"
                            )
                        }
                        className={styles.enlargeOnHover}
                    />
                    <img
                        src={android}
                        alt="android"
                        onClick={() =>
                            openLinkInNewPage(
                                "https://play.google.com/store/apps/details?id=com.befree"
                            )
                        }
                        className={styles.enlargeOnHover}
                    />
                </div>
            </div>

        </div>
    )
}