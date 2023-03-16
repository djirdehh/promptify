import React from "react";
import Image from "next/image";

import Illustration from "../../public/images/images/hero-illustration.svg";
import HeroImage from "../../public/images/images/hero-image.png";

function Hero() {
  return (
    <section className="relative">
      {/* Illustration */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          width="1440"
          height="1265"
          alt="Hero Illustration"
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-40">
          {/* Hero content */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 font-hkgrotesk mb-6" data-aos="fade-up">
              Generate text prompts from AI images{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500">
                for free
              </span>
            </h1>
            <p
              className="text-xl text-slate-500 mb-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Generate text prompts to match images within seconds. Works best
              with images generated from Stable Diffusion.
            </p>
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div>
                <button
                  className="btn text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group"
                  to="/generate"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="pt-16 md:pt-20"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Image
              className="mx-auto"
              src={HeroImage}
              width="920"
              height="518"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
