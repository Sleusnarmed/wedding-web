import React from "react";
import styles from './revelacion.module.css'

const Revelacion = () => {
  return (
    <div className={styles.revelacionContainer}>
      <div className={styles.revelacion}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/QUK_36xQPs0?si=xQcEBCG78F0tmOUM"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Revelacion;
