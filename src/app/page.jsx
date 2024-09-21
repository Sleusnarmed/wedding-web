import Image from "next/image";
import styles from "./page.module.css";
import Login from "@/components/login/Login";

export default function Home() {
  return (
    <div>
      <Login></Login>
    </div>
  );
}
