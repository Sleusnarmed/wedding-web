import { useRef, useState } from "react";
import styles from "./videoPlayer.module.css";

export default function VideoPlayer() {
  const [isVisible, setIsVisible] = useState(false); // Controla si el video se muestra
  const [isClosed, setIsClosed] = useState(false); // Controla si el video ya fue cerrado
  const videoRef = useRef(null);

  // Función para mostrar el video y reproducirlo
  const handlePlay = () => {
    setIsVisible(true); // Mostrar el video
    if (videoRef.current) {
      videoRef.current.muted = false; // Desactivar mute si es necesario
      videoRef.current.play(); // Reproducir el video automáticamente
    }
  };

  // Función para cerrar el video
  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true); // Indica que el video fue cerrado
    window.scrollTo(0, 0);
  };

  return (
    <>
      {!isVisible && !isClosed && (
        <div className={styles.mainVideoContainer}>
            <label className={styles.labelReproductionButton} >Reproducir</label>
          <button onClick={handlePlay} className={styles.playButton} id="reproductionButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" /> {/* Ícono de reproducción */}
            </svg>
          </button>
          <button onClick={handleClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
      )}
      {isVisible && (
        <div className={styles.mainVideoContainer}>
          <div className={styles.videoContainer}>
            <iframe
              width="560"
              height="500"
              src="https://www.youtube.com/embed/fClW6n_QLyo?si=l1baHq7PH7skJOzr&autoplay=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <button onClick={handleClose} className={styles.closeButton}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
