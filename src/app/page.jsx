'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect, Suspense } from 'react';
import Menu from "@/components/menu/Menu"
import Login from "@/components/login/Login";
import Countdown from "@/components/countdown/Countdown";
import Example from "@/components/example/Example"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('guestName');
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Menu onLogout={handleLogout} />
          <Countdown/>
          <Example />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
  </div>
  );
}
