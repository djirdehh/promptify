import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import PurpleBackgroundShape from "../public/images/purple-bg-shape.png";
import PurpleBackgroundShape2 from "../public/images/purple-bg-shape-2.png";

function getBase64(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function Generate() {
  const [userUploadedImage, setUserUploadedImage] = useState(null);

  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (image) => {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });
    let result = await response.json();

    if (response.status !== 201) {
      setError(result.detail);
      setLoading(false);
      return;
    }
    setResult(result);

    while (result.status !== "succeeded" && result.status !== "failed") {
      await sleep(1000);
      const response = await fetch("/api/generate/" + result.id);
      result = await response.json();
      if (response.status !== 200) {
        setError(result.detail);
        setLoading(false);
        return;
      }

      setResult(result);
    }

    if (result.status === "failed") {
      setError(true);
    }

    if (result.status === "succeeded" || result.status === "failed") {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (userUploadedImage) {
      handleSubmit(userUploadedImage);
    }
  }, [userUploadedImage]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const base64Image = await getBase64(acceptedFiles[0]);
      setUserUploadedImage(base64Image);
    },
    [setUserUploadedImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const loadingSection = loading ? (
    <div className="m-auto h-auto flex flex-col bg-indigo-900/30 hover:bg-indigo-900/50 p-6 rounded">
      <svg
        className="w-12 h-12 animate-spin text-indigo-400"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.75V6.25"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M17.1266 6.87347L16.0659 7.93413"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M19.25 12L17.75 12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M17.1266 17.1265L16.0659 16.0659"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M12 17.75V19.25"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M7.9342 16.0659L6.87354 17.1265"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M6.25 12L4.75 12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M7.9342 7.93413L6.87354 6.87347"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
  ) : null;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <header className="absolute w-full z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <a className="block" to="/" aria-label="Cruip">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="0%"
                      y1="32.443%"
                      x2="104.18%"
                      y2="50%"
                      id="hlogo-a"
                    >
                      <stop stopColor="#FFF" stopOpacity=".299" offset="0%" />
                      <stop stopColor="#7587E4" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="18.591%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                      id="hlogo-b"
                    >
                      <stop stopColor="#818CF8" offset="0%" />
                      <stop stopColor="#C7D2FE" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <path fill="#3730A3" d="M16 18.5V32l15.999-9.25V9.25z" />
                    <path fill="#4F46E5" d="m0 23 16 9V18.501L0 9.251z" />
                    <path
                      fillOpacity=".64"
                      fill="url(#hlogo-a)"
                      d="M16 13 0 23l16 9 16-9z"
                    />
                    <path
                      fill="url(#hlogo-b)"
                      d="M16 0 0 9.25l16 9.25 15.999-9.25z"
                    />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="grow">
        <section class="relative h-screen">
          <div class="hidden lg:block max-w-2xs lg:max-w-md absolute top-0 right-0">
            <Image
              class="relative img-fluid w-60"
              src={PurpleBackgroundShape}
              width={240}
              height={330}
            />
          </div>
          <div class="hidden lg:block absolute bottom-0 left-0 max-w-2xs lg:max-w-sm">
            <Image
              class="relative img-fluid w-52"
              src={PurpleBackgroundShape2}
              width={240}
              height={330}
            />
          </div>
          <div class="flex items-center justify-center h-screen">
            <div class="relative container px-4 mx-auto">
              <div class="xl:w-135 max-w-xl mx-auto rounded-md">
                <div class="px-8 py-12 transform -translate-x-1 -translate-y-1 bg-[#c7ff69] font-hkgrotesk border-2 border-black rounded-md">
                  <div class="max-w-sm mx-auto">
                    <div class="text-center mb-4">
                      <span class="block text-sm font-bold uppercase text-indigo-500">
                        complement me
                      </span>
                      <h3 class="text-lg font-bold text-black">
                        Upload an image of yourself and get complemented, in
                        seconds!
                      </h3>
                    </div>
                    <form action="">
                      <div
                        class="flex items-center justify-center flex-wrap mb-4 -mx-2"
                        {...getRootProps()}
                      >
                        <div className="flex min-h-[250px] bg-white border-dashed border-2 border-black rounded p-8 text-center cursor-pointer">
                          <div className="m-auto">
                            <input {...getInputProps()} />
                            {userUploadedImage ? (
                              <div>
                                <Image
                                  src={userUploadedImage}
                                  alt="Uploaded Image"
                                  width="500"
                                  height="400"
                                />
                              </div>
                            ) : (
                              <p className="text-black text-center">
                                Upload or drag and drop an image here
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <button class="group relative inline-block h-12 w-full bg-blueGray-900 rounded-md">
                        <div class="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300">
                          <div class="flex h-full w-full items-center justify-center bg-indigo-500 border-2 border-black rounded-md transition duration-300">
                            <span
                              class="text-base font-black text-white"
                              data-config-id="auto-txt-4-5"
                            >
                              Complement me
                            </span>
                          </div>
                        </div>
                      </button>
                      <div class="flex mt-2 justify-center">
                        <label class="text-xs text-black text-center font-bold">
                          We don't keep any images or information about you on
                          our server. The best type of images to upload are
                          profile images of yourself.
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Generate;
