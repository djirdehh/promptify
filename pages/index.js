import Head from "next/head";
import Header from "../components/partials/Header";
import Hero from "../components/partials/Hero";
import Testimonials from "../components/partials/Testimonials";
// import Features from "../components/partials/Features";
import Features02 from "../components/partials/Features02";
import Integrations from "../components/partials/Integrations";
import Pricing from "../components/partials/Pricing";
import SingleTestimonial from "../components/partials/SingleTestimonial";
import Faqs from "../components/partials/Faqs";
import Cta from "../components/partials/Cta";
import Footer from "../components/partials/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>RemoveBG | Remove Image Backgrounds For Free</title>

        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>

      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="grow">
          {/*  Page sections */}
          <Hero />
          <Testimonials />
          {/* <Features /> */}
          <Features02 />
          <Integrations />
          <Pricing />
          <SingleTestimonial />
          <Faqs />
          <Cta />
        </main>

        {/*  Site footer */}
        <Footer />
      </div>
    </div>
  );
}
