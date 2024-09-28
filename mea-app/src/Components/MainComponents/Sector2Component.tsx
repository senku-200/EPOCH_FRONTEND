/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSpring, animated } from "react-spring";
import TimerComponent from "../TimerComponent";

const Sector2Component: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const targetDate = useMemo(() => new Date("2024-10-22T00:00:00"), []);
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [targetDate]);

  const fadeInText = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 500,
    config: { duration: 1000 },
  });

  const fadeInTimer = useSpring({
    from: {
      top: "50%",
      left: "50%",
      opacity: 0,
      transform: "translatex(0%,0%)",
    },
    to: { opacity: 1, transform: "translate(-50%,-50%)" },
    delay: 1000,
    config: { duration: 1000 },
  });

  return (
    <section className="w-screen h-auto bg-black flex flex-col">
      <animated.div
        style={fadeInText}
        className="w-full py-12 px-10 flex flex-col items-center justify-center font-bebas gap-8 text-white h-auto"
      >
        <p className="text-4xl font-extrabold">October 22, 23, 24</p>
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="max-w-[1100px] text-2xl text-center text-orange-600 tracking-widest">
            To foster the students' technical expertise, a series of events
            including workshops, guest lectures, and seminars are being held
            under the MEA clubs. Highlighting this initiative is a
            national-level technical symposium.
          </p>
          <p className="text-4xl font-bebas uppercase text-shadow font-extrabold">
            Phantasm'25 – Epoch
          </p>
        </div>
      </animated.div>

      <div className="relative w-full md:min-h-[400px] flex items-center justify-center">
        <p className="font-bebas tracking-widest text-[#212529] uppercase text-center hidden md:block md:text-[12rem] 2xl:text-[15rem] font-bold absolute left-1/2 -translate-x-1/2">
          begin in
        </p>

        <animated.div
          style={fadeInTimer}
          className="w-full relative md:absolute flex flex-col justify-center md:flex-row items-center gap-10 md:gap-40 left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2"
        >
          <TimerComponent label="days" value={timeLeft.days} />
          <TimerComponent label="hours" value={timeLeft.hours} />
          <TimerComponent label="minutes" value={timeLeft.minutes} />
          <TimerComponent label="seconds" value={timeLeft.seconds} />
        </animated.div>
      </div>
    </section>
  );
};

export default Sector2Component;
