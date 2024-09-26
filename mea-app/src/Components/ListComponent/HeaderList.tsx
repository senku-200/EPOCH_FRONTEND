"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useMenucontext } from "@/Context/MenuContext/MenuContextProvider";

interface PropType {
  label: string;
  url: string;
  className?:string;
}

const HeaderList: React.FC<PropType> = ({ label, url,className='text-white md:text-black'}) => {
  const { removeVisibility } = useMenucontext();
  const pathName = usePathname();

  const isPath = () => pathName === url;

  return (
    <li className="transition-all text-white hover:scale-110">
      <Link
        href={url}
        className={`font-semibold font-bebas tracking-widest whitespace-nowrap capitalize ${
          isPath() ? "text-orange-600" : `{${className}}`
        } hover:text-orange-500`}
        aria-current={isPath() ? "page" : undefined}
        onClick={removeVisibility}
      >
        {label}
      </Link>
    </li>
  );
};

export default HeaderList;
