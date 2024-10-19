"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importa desde 'next/navigation'
import styles from "./lamejornochesari&dany.module.css";
import Countdown from "@/components/countdown/Countdown";
import Carrier from "@/components/carrier/Carrier";
import Confirmation from "@/components/confirmation/Confirmation";

const getData = async () => {
  const res = await fetch("/api/guests", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const BodaDaraiPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter(); // Hook para redirección

  useEffect(() => {
    const guestName = localStorage.getItem("guestName");

    // Verificar si el usuario está autenticado
    if (!guestName) {
      router.push("/"); // Redirigir a la página de login si no está autenticado
      return;
    }

    // Si está autenticado, obtener datos del invitado
    const fetchData = async () => {
      try {
        const guests = await getData();
        const authenticatedGuest = guests.find(
          (guest) => guest.name === guestName
        );

        if (authenticatedGuest) {
          setData(authenticatedGuest);
        } else {
          setError("No se encontró la información del invitado autenticado.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al obtener los datos.");
        setLoading(false);
      }
    };

    fetchData();
  }, [router]); // Elimina 'guestName' de las dependencias

  if (loading) {
    return <Carrier />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.pageContainer}>
        <div className={styles.decortaionLightsContainer__topPage}>
          <Image
            src="/img/decoration-lights_mainPage.png"
            alt="Decotración lamejornochesari y Dany"
            width={300}
            height={100}
          />
        </div>
        <h1 className={styles.names}>Daniel y Saraí</h1>
        <Countdown />
        <div className={styles.gratitudeText}>
          <p className={styles.title}>¡El amor esta en el aire!</p>
          <p className={styles.paragraph}>
            Desde que nos conocimos andábamos entre las nubes pero nunca
            pensamos que al pasar el tiempo compartiríamos experiencias únicas,
            pláticas con muchas risas y música que saldría de nuestros
            corazones. <br /><br />Llegamos a descubrir que las cosas juntos eran más
            divertidas y llenas de amor, sabemos ahora que es el momento ideal
            para compartir esta nueva aventura de la mano de Dios; nos
            encantaría celebrar este único momento con la compañía de nuestra
            familia y mejores amigos.
          </p>
          <p className={styles.farewell}>¿Nos acompañarías?</p>
        </div>
        <div className={styles.decorationLightsContainer__midPage}>
          <Image
            src="/img/decoration-lights_mainPage.png"
            alt="Decotración lamejornochesari y Dany"
            width={300}
            height={100}
          />
        </div>
        <div className={styles.bibleVerse}>
          <p className={styles.verse}>
            “Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos.
            Si diese el hombre todos los bienes de su casa por este amor, de
            cierto lo menospreciarían.”
          </p>
          <p className={styles.verseNumber}>Cantares 8:7</p>
        </div>

        {/* Componente de Confirmación */}
        <Confirmation
          guestId={data?.id}
          initialConfirmation={data?.confirmation}
          data={data}
        />
        <div className={styles.decorationLightsContainer__bottomPage}>
          <Image
            src="/img/decoration-lights_mainPage.png"
            alt="Decotración lamejornochesari y Dany"
            width={300}
            height={100}
          />
        </div>
        <div className={styles.dressCode}>
          <h2>——Dress code——</h2>
          <p> Vestimenta formal </p>
        </div>

        <div className={styles.forbiddenColors}>
          <h2>— Colores prohibidos —</h2>
          <div className={styles.forbiddenColors__ImageContainer}>
            <Image
              src="/img/forbiddenColors.png"
              alt="Colores prohibidos"
              width={300}
              height={80}
            />
          </div>
        </div>

        <div className={styles.giftTable}>
          <h2 className={styles.giftTable__title}>
            Si gustas regalarnos algo:{" "}
          </h2>
          <div className={styles.linkTablesContainer}>
            <a href="/gift-table" className={styles.linkTable}>
              Tabla de regalos
            </a>
            <a href="/registry" className={styles.linkTable}>
              Registro
            </a>
            <a href="/lamejornochesari&dany/page" className={styles.linkTable}>
              Página de la boda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodaDaraiPage;
