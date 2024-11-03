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
export const dynamic = "force-dynamic";
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
                alt="Logo of Amazon"
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
                alt="Logo of Card"
                width={300}
                height={80}
              />
            </a>
            <a href="/lamejornochesari&dany/page" className={styles.linkTable}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148c25.049-31.381 43.63-49.449 82.757-49.449c30.764 0 68.816 19.799 68.816 49.631c0 22.552-18.617 34.134-48.993 51.164c-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271c0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271s-31.075-69.27-69.271-69.27z"
                />
              </svg>
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
                !Estate atento a está página, en los próximos meses habrán más
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
