import React, { useState, useEffect } from 'react';
import styles from './countdown.module.css'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-02-08T00:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        });
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.countdownContainer__days}>
        <p className={styles.timeValue}>{timeLeft.days}</p>
        <p className={styles.timeLabel}>Días</p>
      </div>
      <div className={styles.countdownContainer__hours}>
        <p className={styles.timeValue}>{timeLeft.hours}</p>
        <p className={styles.timeLabel}>Horas</p>
      </div>
      <div className={styles.countdownContainer__minutes}>
        <p className={styles.timeValue}>{timeLeft.minutes}</p>
        <p className={styles.timeLabel}>Minutos</p>
      </div>
      <div className={styles.countdownContainer__seconds}>
        <p className={styles.timeValue}>{timeLeft.seconds}</p>
        <p className={styles.timeLabel}>Segundos</p>
      </div>
    </div>
  );
};

export default Countdown;
