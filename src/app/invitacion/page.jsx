"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importa desde 'next/navigation'
import styles from "./invitacion.module.css";
import Countdown from "@/components/countdown/Countdown";
import Loader from "@/components/loader/Loader";
import Confirmation from "@/components/confirmation/Confirmation";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import MapEmbed from "@/components/mapEmbed/MapEmbed";

const getData = async () => {
  const res = await fetch("/api/guests", {
    cache: "no-store",
    next: {
      revalidate: 0,
    },
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
  const router = useRouter();

  useEffect(() => {
    const guestName = localStorage.getItem("guestName");

    if (!guestName) {
      router.push("/"); // Redirige si no está autenticado
      return;
    }

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
  }, [router]);

  const handleUpdateConfirmation = (updatedConfirmation) => {
    setData((prevData) => ({
      ...prevData,
      confirmation: updatedConfirmation,
    }));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p>
        {error} Por favor contáctate con Sarai o manda correo a
        Jmsalazar.macg@hotmail.com
      </p>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <VideoPlayer></VideoPlayer>
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
            corazones. <br />
            <br />
            Llegamos a descubrir que las cosas juntos eran más divertidas y
            llenas de amor, sabemos ahora que es el momento ideal para compartir
            esta nueva aventura de la mano de Dios; nos encantaría celebrar este
            único momento con la compañía de nuestra familia y mejores amigos.
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
          onUpdate={handleUpdateConfirmation}
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
              height={45}
            />
          </div>
        </div>

        <div className={styles.giftTable}>
          <h2 className={styles.giftTable__title}>
            Si gustas regalarnos algo:{" "}
          </h2>
          <div className={styles.linkTablesContainer}>
            <a
              href="https://www.amazon.com.mx/wedding/registry/RY4YW5V4AQ1T"
              className={styles.linkTable}
            >
              <Image
                src="/img/amazonLogo.png"
                alt="Logo de Amazon"
                width={300}
                height={80}
              />
            </a>
            <a
              href="https://www.chapur.com.mx/mesa-de-regalos/97880"
              className={styles.linkTable}
            >
              <Image
                src="/img/chapurLogo.png"
                alt="Logo de chapur"
                width={300}
                height={80}
              />
            </a>
            <a href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51555960" className={styles.linkTable}>
              <Image
                className={styles.linkTable}
                src="/img/liverpoolLogo.png"
                alt="Logo de Liverpool"
                width={300}
                height={80}
              />
            </a>
          </div>
        </div>
        <div className={styles.ubicationContainer}>
          <h2>Ubicación</h2>
          <div className={styles.ubicationContainer__information}>
            <p>
              Por tu comodidad durante la ceremonia requerimos que lleves un
              cojín para sentarte ya que será a la orilla de la playa. En caso
              de requerir silla favor de hacérnoslo saber.
              <br /> <br />
              Día de la boda: <br />
              8 de Febrero 2025
              <br />
              <br /> Recepción: 4pm
              <br />
              (La fiesta será en el mismo lugar)
              <br /> <br />
              Pizza Paraíso SAN BRUNO, Telchac Puerto Yucatán
              <br />
              <br />
            </p>
            <div className={styles.mapCotainer}>
              <MapEmbed />
              <p>
                !Estate atento a está página, en los próximos 8 días habrán más
                avisos!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodaDaraiPage;
