// Loader.jsx
import React from "react";
import styles from "./loader.module.css"; // Asegúrate de tener un archivo CSS para los estilos.

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <svg
        className={styles.palmTree}
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 9c1.59 7.61-2 13-2 13h3c1.88-5.8 1-9.91.5-12m2.16-2.84c.17.21.34.43.47.66a7.1 7.1 0 0 1-.63 8.44a7.11 7.11 0 0 0-.55-6.49c-.08-.13-.17-.24-.25-.36a7.123 7.123 0 0 0-2.16-1.98a7.127 7.127 0 0 0-4.96 6.79c0 .74.11 1.45.31 2.11a7.073 7.073 0 0 1-1.33-4.14c0-2.35 1.14-4.43 2.89-5.73C8 6.35 6.46 6.67 5.12 7.5c-.62.41-1.16.88-1.62 1.41c.55-1.33 1.5-2.52 2.8-3.34c1.5-.94 3.2-1.25 4.84-1.01C10.73 4 10.23 3.47 9.63 3c-.58-.42-1.21-.76-1.87-1c1.44.04 2.88.5 4.11 1.43c.63.47 1.13 1.04 1.53 1.64c.1 0 .19-.01.29-.01c3.2 0 5.91 2.11 6.81 5.02a7.073 7.073 0 0 0-4.84-2.92Z"
        />
      </svg>
    </div>
  );
};

export default Loader;
