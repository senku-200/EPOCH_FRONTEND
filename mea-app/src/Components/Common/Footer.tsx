import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalPostOffice, MdOutlineSmartphone } from "react-icons/md";
import HeaderListContainer from "../ListComponent/HeaderListContainer";
import ContainerComponent from "../FooterComponents/ContainerComponent";
import { IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io";

const Footer: React.FC = () => {
  const context = [
    {
      title: "about us",
      content: (
        <p className="font-bebas text-sm tracking-widest">
          Mechanical Engineering Association (MEA) is the major part of
          Department of Mechanical Engineering headed by Dr.P.Thirumal, Head of
          the Department.
        </p>
      ),
    },
    {
      title: "CONTACT US",
      content: (
        <div className="">
          <div className="leading-loose font-bebas tracking-widest">
            <p className="flex items-center gap-1">
              <FaLocationDot /> Mechanical Engineering Association, GCE, Bargur,
              Krishnigiri
            </p>
            <p className="flex items-center gap-1">
              <MdLocalPostOffice /> info@meagceb.in
            </p>
            <p className="flex items-center gap-1">
              <MdOutlineSmartphone /> +91 123456789
            </p>
          </div>
          <div className="flex items-center gap-5 pt-2">
            <a href="" className="text-orange-600 text-xl hover:scale-125 transition-all"><IoLogoInstagram /></a>
            <a href="" className="text-orange-600 text-xl hover:scale-125 transition-all"><IoLogoLinkedin /></a>
            <a href="" className="text-orange-600 text-xl hover:scale-125 transition-all"><IoLogoYoutube /></a>
          </div>
        </div>
      ),
    },
    {
      title: "links",
      content: (
        <div className="">
          <HeaderListContainer className="flex-col text-[#aaaaaa] md:text-xs justify-start md:gap-2" />
        </div>
      ),
    },
  ];
  return (
    <footer className="bg-black min-w-screen py-2">
      <div className="hidden md:flex flex-row items-center justify-around">
        {context.map(({ title, content }, index) => (
          <ContainerComponent key={index} title={title} content={content} />
        ))}
      </div>
      <section className="w-screen bg-zinc-800 h-10 flex items-center justify-center">
        <p className="text-[Inter] uppercase text-[10px] tracking-widest font-[600] text-zinc-300">DEVELOPED BY MEAGCEB | &copy; 2024</p>
      </section>
    </footer>
  );
};

export default Footer;
