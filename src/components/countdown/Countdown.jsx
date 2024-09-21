import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-02-08T00:00:00');
    const now = new Date();

    const updateCountdown = () => {
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const totalMonths = targetDate.getMonth() - now.getMonth() + (12 * (targetDate.getFullYear() - now.getFullYear()));
        const months = totalMonths - (now.getDate() > targetDate.getDate() ? 1 : 0);

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ months, days, hours, minutes, seconds });
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        <p>
          {timeLeft.months}
        </p>
        <p>Meses</p>
      </div>
      <div>
        <p>{timeLeft.days}</p>
        <p>Días</p>
      </div>
      <div>
        <p>{timeLeft.hours}</p>
        <p>Horas</p>
      </div>
      <div>
        <p>{timeLeft.minutes}</p>
        <p>Minutos</p>
      </div>
    </div>
  );
};

export default Countdown;
