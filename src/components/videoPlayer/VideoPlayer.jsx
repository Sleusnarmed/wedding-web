// src/components/VideoPlayer.jsx
import { useState } from 'react';
import { YouTubeEmbed } from '@next/third-parties/google'
import styles from './videoPlayer.module.css';

export default function VideoPlayer() {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        window.scrollTo(0, 0);
    };

    return (
        <>  
            {isVisible && (
                <div className={styles.mainVideoContainer}>
                    <div className={styles.videoContainer}>
                        <YouTubeEmbed videoId="gfU1iZnjRZM" width={700} height={250} params="autoplay=1" frameborder="0" allow="autoplay; fullscreen" />
                        <button onClick={handleClose} className={styles.closeButton}>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}