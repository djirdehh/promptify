import { useEffect } from "react";
import AOS from "aos";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";

import "aos/dist/aos.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 500,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [router.pathname]); // triggered on route change

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
