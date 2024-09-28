import React, { ReactNode } from "react";
import RegisterBtnComponent from "./RegisterBtnComponent";
import { Incharge } from "@/api/EventApi";
import PageTitleComponent from "./PageTitleComponent";
import { Event } from "@/api/EventApi";
interface Props {
  event: Event;
  inchargeDetails: Incharge[];
}
const DetailedViewComponent: React.FC<Props> = ({ event, inchargeDetails }) => {
  return (
    <section>
      <div className="">
        <PageTitleComponent
          mainTitle={event.name}
          spanTitle={
            <p>
              <span className="text-orange-600">{event.name}</span>
            </p>
          }
          className={"md:text-[8rem] text-nowrap"}
        />
      </div>
      <div className="mx-auto p-10 md:p-20">
        <div className="border-[3px] border-gray-300 rounded-lg p-6 flex flex-col gap-6">
          {/* Instructions Section */}
          <h2 className="font-bebas text-2xl md:text-3xl text-white tracking-widest">
            <span className="text-orange-600">Instru</span>ctions:
          </h2>
          <p className="text-sm md:text-base font-bebas text-white pr-5">
            {event.instructions}
          </p>

          <div>
            <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-widest">
              <span className="text-orange-600">Event</span> Details:
            </h3>
            <div className="text-white font-bebas">
              <p className="text-lg md:text-xl tracking-wide">
                No. of participants:{" "}
                <span className="text-orange-600">
                  {event.is_team ? event.max_team_size : 1}
                </span>
              </p>
              <p className="text-sm md:text-lg">
                Time Limit:{" "}
                <span className="text-orange-600">
                  {event.time_limit ? event.time_limit : "NIL"}
                </span>
              </p>
            </div>
          </div>

          {/* Event Incharges */}
          <div>
            <div className="mt-4 text-white">
              <h4 className="font-bebas uppercase tracking-wider text-lg md:text-2xl">
                <span className="text-orange-600">Event</span> Incharges:
              </h4>
              <ul className="font-bebas text-sm md:text-lg">
                {inchargeDetails.map(({ name, phone_number }, index) => (
                  <li key={index}>
                    {name}:
                    <span className="text-orange-600"> {phone_number}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Register Button */}
          <RegisterBtnComponent />
        </div>
      </div>
    </section>
  );
};

export default DetailedViewComponent;
