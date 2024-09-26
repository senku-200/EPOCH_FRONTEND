import { navigations } from "@/types/NavigationLinks/NavLinks";
import React from "react";
import HeaderList from "./HeaderList";
interface PropType{
    className?:string;
}
const HeaderListContainer:React.FC<PropType> = ({className=""}) => {
  return (
    <ul className={`flex gap-3 md:gap-5 transition-all ${className}`}>
      {navigations.map(({ label, url }, index) => (
        <HeaderList key={index} label={label} url={url} className={className}/>
      ))}
    </ul>
  );
};

export default HeaderListContainer;
