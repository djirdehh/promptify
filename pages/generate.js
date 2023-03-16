import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import Illustration from "../public/images/images/auth-illustration.svg";

function Generate() {
  const [userUploadedImage, setUserUploadedImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setUserUploadedImage(acceptedFiles[0]);
    },
    [setUserUploadedImage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          {/* Illustration */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
            aria-hidden="true"
          >
            <Image
              src={Illustration}
              className="max-w-none"
              width="1440"
              height="332"
              alt="Page Illustration"
            />
          </div>
          <div className="flex items-center justify-center h-screen w-screen">
            <div className="flex space-x-20">
              {/* Left side */}
              <div
                className="flex items-center border-dashed border-2 border-indigo-500 w-64 h-32 rounded min-w-[350px] w-full min-h-[350px] h-full text-gray-500 text-sm text-center cursor-pointer select-none"
                {...getRootProps()}
              >
                <div className="m-auto">
                  <input {...getInputProps()} />
                  {userUploadedImage ? (
                    <Image
                      src={URL.createObjectURL(userUploadedImage)}
                      width="350"
                      height="350"
                    />
                  ) : (
                    <p>Upload or drag and drop a starting image here</p>
                  )}
                </div>
              </div>
              {/* Right side */}
              <div className="flex items-center relative w-full max-w-md mx-auto">
                <p className="font-hkgrotesk text-center lg:text-left">
                  Upload an image to get started...
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Generate;
