import React, { ReactNode } from "react";
import RegisterBtnComponent from "./RegisterBtnComponent";
interface Incharges {
  name: string;
  phoneNumber: number;
}
interface Props {
  title: string;
  instruction: string;
  custom?: ReactNode;
  inchargeDetails: Incharges[];
}
const DetailedViewComponent: React.FC<Props> = ({
  title,
  instruction,
  custom,
  inchargeDetails,
}) => {
  return (
    <div className="mx-auto p-10 md:p-20">
      <div className="border-[3px] border-gray-300 rounded-lg p-6 flex flex-col gap-6">
        {/* Instructions Section */}
        <h2 className="font-bebas text-2xl md:text-3xl text-white tracking-widest">
          <span className="text-orange-600">Instru</span>ctions:
        </h2>
        <p className="text-sm md:text-base font-bebas text-white pr-5">
          {instruction}
        </p>

        {/* Contact and Submission Section */}
        <div>{custom}</div>

        {/* Event Incharges */}
        <div>
          <div className="mt-4 text-white">
            <h4 className="font-bebas uppercase tracking-wider text-lg md:text-2xl">
              <span className="text-orange-600">Event</span> Incharges:
            </h4>
            <ul className="font-bebas text-sm md:text-base">
              {inchargeDetails.map(({ name, phoneNumber }, index) => (
                <li key={index}>
                  {name}:<span className="text-orange-600"> {phoneNumber}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Register Button */}
        <RegisterBtnComponent />
      </div>
    </div>
  );
};

export default DetailedViewComponent;
