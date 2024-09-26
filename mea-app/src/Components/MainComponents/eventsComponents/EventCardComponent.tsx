"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Props {
  link: string;
  label: string;
}
const EventCardComponent: React.FC<Props> = ({ link, label }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Link href={link} className="cursor-pointer hover:scale-105 transition-all">
      <div className="w-[250px] h-[250px] border-[0px] border-[#212529] rounded-xl flex items-center justify-center border-box">
        <p className="font-bebas tracking-widest text-xl text-white font-normal">
          {label}
        </p>
      </div>
    </Link>
  );
};

export default EventCardComponent;
