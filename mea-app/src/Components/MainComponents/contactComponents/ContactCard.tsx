import React from "react";
import { IoIosCall } from "react-icons/io";
interface Props {
  name: String;
  committee: String;
  phoneNo: String;
}
const ContactCard: React.FC<Props> = ({ name, committee, phoneNo }) => {
  return (
    <div className="border-box w-[300px] h-auto bg-orange-600 text-white flex flex-col items-center justify-center gap-5 py-8 font-bebas rounded-sm hover:border-box transition-all hover:scale-105 cursor-pointer">
      <p className="md:text-xl uppercase tracking-widest">{name}</p>
      <p className="text-2xl font-extrabold uppercase tracking-wider">
        {committee} 
      </p>
      <p className="text-xl font-normal flex items-center">
        <IoIosCall />
        {phoneNo}
      </p>
    </div>
  );
};

export default ContactCard;
