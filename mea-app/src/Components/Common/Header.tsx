"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import HeaderListContainer from "../ListComponent/HeaderListContainer";
import { useMenucontext } from "@/Context/MenuContext/MenuContextProvider";
import { MdOutlineCancel } from "react-icons/md";
import { FaGears } from "react-icons/fa6";
import RegisterBtnComponent from "./RegisterBtnComponent";
import Image from "next/image";

const Header: React.FC = () => {
  const { isMenuVisible, toogleMenuVisibility, removeVisibility } =
    useMenucontext();
  const MenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (MenuRef.current && !MenuRef.current.contains(event.target as Node)) {
        removeVisibility();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [removeVisibility]);

  return (
    <header className="w-screen flex items-center justify-between px-5 py-3 bg-black sticky top-0 z-50 md:justify-evenly">
      <div className="">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/assests/phantasm_logo.png"
              alt="MEA LOGO"
              width={50}
              height={50}
              className="object-cover"
            />
            {/* <FaGears className="text-white w-10 h-10" /> */}
            <p className="text-white font-[Inter] text-xl uppercase font-extrabold">
              MEA
            </p>
          </div>
        </Link>
      </div>
      <div className="hidden md:block">
        <HeaderListContainer className="gap-5" />
      </div>
      <div className="hidden md:block">
        <RegisterBtnComponent />
      </div>
      <div className="md:hidden">
        <button
          type="button"
          title="Menu Button"
          onClick={toogleMenuVisibility}
          className="relative z-40 text-[20px] text-white"
        >
          {isMenuVisible ? <MdOutlineCancel /> : <IoIosMenu />}
        </button>
      </div>
      <div
        ref={MenuRef}
        className={`${
          isMenuVisible ? "block" : "hidden"
        } absolute top-16 right-2 max-w-32 px-4 py-5 bg-[#444444] z-50 rounded-lg transition-all`}
      >
        <HeaderListContainer className="flex-col justify-center" />
      </div>
    </header>
  );
};

export default Header;
