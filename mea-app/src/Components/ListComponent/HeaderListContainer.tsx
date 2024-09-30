"use client";
import { navigations } from "@/types/NavigationLinks/NavLinks";
import React from "react";
import HeaderList from "./HeaderList";
import RegisterBtnComponent from "../Common/RegisterBtnComponent";
import { useMenucontext } from "@/Context/MenuContext/MenuContextProvider";
interface PropType {
  className?: string;
}

const HeaderListContainer: React.FC<PropType> = ({ className = "" }) => {
  const { removeVisibility } = useMenucontext();
  return (
    <ul className={`flex gap-3 md:gap-5 transition-all ${className}`}>
      {navigations.map(({ label, url }, index) => (
        <HeaderList key={index} label={label} url={url} className={className} />
      ))}
      <li className="block md:hidden" onClick={removeVisibility}>
        <RegisterBtnComponent styling="text-sm px-3 py-1"/>
      </li>
    </ul>
  );
};

export default HeaderListContainer;
