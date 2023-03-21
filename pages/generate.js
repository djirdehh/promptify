import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { TwitterShareButton } from "react-twitter-embed";

import PurpleBackgroundShape from "../public/images/purple-bg-shape.png";
import PurpleBackgroundShape2 from "../public/images/purple-bg-shape-2.png";
import Avatar01 from "../public/images/images/avatar-01.jpg";

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
  const [complementResult, setComplementResult] = useState(undefined);
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

  useEffect(() => {
    const makeChatGPTRequest = async (prompt) => {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const responseData = await response.json();
      setComplementResult(responseData.data);
    };

    if (result?.output) {
      makeChatGPTRequest(result.output);
    }
  }, [result]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const base64Image = await getBase64(acceptedFiles[0]);
      setUserUploadedImage(base64Image);
    },
    [setUserUploadedImage]
  );

  const startOver = () => {
    setUserUploadedImage(null);
    setResult(undefined);
    setComplementResult(undefined);
    setLoading(false);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const content = complementResult ? (
    <div className="max-w-lg mx-auto text-black">
      <div className="mb-6 border-2 border-black bg-white rounded-md">
        {userUploadedImage && (
          <div className="relative flex px-5 pt-5 pb-2 items-center justify-between">
            <Image
              className="rounded-full border-2 border-slate-900 box-content m-auto mb-4"
              src={userUploadedImage}
              width="80"
              height="80"
            />
            <div className="absolute bottom-0 left-0 py-px bg-black w-full"></div>
          </div>
        )}

        <div className="flex px-5 py-5 items-center justify-between">
          <span
            className="text-md text-center font-bold"
            data-config-id="auto-txt-24-1"
          >
            {complementResult}
          </span>
        </div>
      </div>
      <div className="text-center text-black">
        <button className="lil-button" onClick={startOver}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          Start over
        </button>
        <button className="lil-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon"
          >
            <path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" />
          </svg>
          Copy to clipboard
        </button>
        <div className="twitter-share">
          <TwitterShareButton
            options={{ text: "test", via: "djirdehh" }}
            placeholder={
              <a
                className="lil-button"
                target="_blank"
                rel="noopener noreferrer"
                href="https://replicate.delivery/pbxt/fUke5nATU4utRkMGytgNHk9c2ynfLB37BtMgvYVc81RaEkShA/out-0.png"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Tweet
              </a>
            }
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-sm mx-auto">
      <div className="text-center mb-4">
        <span className="block text-sm font-bold uppercase text-indigo-500">
          complement me
        </span>
        <h3 className="text-lg font-bold text-black">
          Upload an image of yourself and get complemented, in seconds!
        </h3>
      </div>
      <div
        className="flex items-center justify-center flex-wrap mb-4 -mx-2"
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
                  height="200"
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
      <button
        className="group relative inline-block h-12 w-full bg-blueGray-900 rounded-md"
        onClick={() => handleSubmit(userUploadedImage)}
      >
        <div className="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full group-hover:translate-y-0 group-hover:translate-x-0 transition duration-300">
          <div className="flex h-full w-full items-center justify-center bg-indigo-500 border-2 border-black rounded-md transition duration-300">
            <span
              className="text-base font-black text-white"
              data-config-id="auto-txt-4-5"
            >
              Complement me
            </span>
          </div>
        </div>
      </button>
      <div className="flex mt-2 justify-center">
        <label className="text-xs text-black text-center font-bold">
          We don't keep any images or information about you whatsoever.
        </label>
      </div>
    </div>
  );

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
        <section className="relative h-screen">
          <div className="hidden lg:block max-w-2xs lg:max-w-md absolute top-0 right-0">
            <Image
              className="relative img-fluid w-60"
              src={PurpleBackgroundShape}
              width={240}
              height={330}
            />
          </div>
          <div className="hidden lg:block absolute bottom-0 left-0 max-w-2xs lg:max-w-sm">
            <Image
              className="relative img-fluid w-52"
              src={PurpleBackgroundShape2}
              width={240}
              height={330}
            />
          </div>
          <div className="flex items-center justify-center h-screen">
            <div className="relative container px-4 mx-auto">
              <div className="xl:w-135 max-w-xl mx-auto rounded-md">
                <div className="px-8 pt-12 pb-8 transform -translate-x-1 -translate-y-1 bg-[#c7ff69] font-hkgrotesk border-2 border-black rounded-md">
                  {content}
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
