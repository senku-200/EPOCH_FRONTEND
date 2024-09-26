/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Typical from "react-typical";
import { useSpring, animated } from "react-spring";
import Link from "next/link";

const ImageOverlayComponent = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    config: { duration: 1000 },
  });

  const fadeInText = useSpring({
    from: { transform: "translateY(20px)", opacity: 0 },
    to: { transform: "translateY(0px)", opacity: 1 },
    delay: 1500,
    config: { duration: 1000 },
  });

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="relative w-full h-full">
        <Image
          src={"/assests/carBg.jpg"}
          alt={"Car BG"}
          fill
          className="w-full h-full object-cover brightness-[45%] transition-transform duration-1000 transform scale-105 hover:scale-100"
        />
      </div>

      <animated.div
        style={fadeIn}
        className="absolute text-center text-white top-10 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center justify-evenly w-auto"
      >
        <div className="flex flex-col gap-8 font-bebas uppercase font-bold">
          <p className="text-xl w-screen pt-5 md:text-4xl 2xl:text-5xl md:whitespace-nowrap tracking-[0.5rem]">
            <Typical
              steps={[
                "government college of engineering",
                1000,
                "government college of engineering bargur krishnagiri",
              ]}
              loop={1}
              wrapper="span"
            />
          </p>
          <animated.h4
            style={fadeInText}
            className="font-normal md:text-xl tracking-[0.5rem]"
          >
            department of mechanical engineering
          </animated.h4>
        </div>

        <div className="flex flex-col gap-10 md:gap-0 items-center md:flex-row justify-around my-10 w-full">
          <Image
            src={"/assests/gcebargurlogo.png"}
            alt={"gceb_logo"}
            width={110}
            height={110}
            className="object-fit w-20 h-20 md:w-28 md:h-28 transition-transform duration-500 transform hover:scale-110"
          />
          <Image
            src={"/assests/mea_logo.png"}
            alt={"gceb_mech_logo"}
            width={130}
            height={120}
            className="object-fit w-20 h-20 md:w-28 md:h-28 transition-transform duration-500 transform hover:scale-110"
          />
        </div>

        <animated.div style={fadeInText}>
          <p className="text-shadow font-protest uppercase text-2xl md:text-4xl tracking-[0.5rem] font-extrabold">
            phantasm'25 <span className="uppercase">epoch</span>
          </p>
          <Link href={"/explore"}>
            <button
              type="button"
              className="transition-all text-sm md:text-lg px-4 py-2 my-10 font-normal font-protest uppercase outline-none border rounded-md border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white "
            >
              register
            </button>
          </Link>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default ImageOverlayComponent;
