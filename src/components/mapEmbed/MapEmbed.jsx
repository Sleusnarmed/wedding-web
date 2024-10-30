import React from 'react';
import styles from './mapEmbed.module.css'

const MapEmbed = () => {
  return (
    <div className={styles.mapEmbedContainer}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.5019500896265!2d-89.37781249999999!3d21.330687500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f543328e22e69eb%3A0x700e854ae4a8e1e0!2sPizza%20Paradiso%20SAN%20BRUNO%20%F0%9F%A4%99!5e0!3m2!1ses-419!2smx!4v1729813836574!5m2!1ses-419!2smx"
        width="200"
        height="200"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
