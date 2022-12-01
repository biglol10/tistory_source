import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div
          style={{ backgroundColor: "blueviolet", height: "100px" }}
          onClick={() => router.push("/protected")}
        >
          Go to Protected page
        </div>

        <br />

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <br />

        <div
          style={{ backgroundColor: "violet", height: "100px" }}
          onClick={() => router.push(`/routerCareful/${inputValue}`)}
        >
          Go to dynamic route page
        </div>
      </main>
    </div>
  );
}
