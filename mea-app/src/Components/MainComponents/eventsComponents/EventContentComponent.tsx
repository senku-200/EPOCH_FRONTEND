import PageTitleComponent from "@/Components/Common/PageTitleComponent";
import React from "react";

const EventContentComponent: React.FC = () => {
  return (
    <section className="flex flex-col items-center gap-10">
      <div className="text-white font-bebas flex flex-col items-center justify-center gap-3 md:text-5xl">
        <PageTitleComponent
          mainTitle="events"
          spanTitle={
            <p className="tracking-widest">
              <span className="text-orange-600">eve</span>nts
            </p>
          }
        />
      </div>
      <div className="font-bebas text-xl tracking-widest md:text-2xl md:tracking-[0.5rem] text-white flex flex-col items-center gap-5">
        <p className="">
          online registration <span className="text-orange-600">-₹250</span>
        </p>
        <p className="">
          onspot registration <span className="text-orange-600">-₹300</span>
        </p>
        <p className="">
          Free <span className="text-orange-600">accomendation</span>&
          <span className="text-orange-600">food</span> will be provided
        </p>
        <p className="">
          for <span className="text-orange-600">3</span> days
        </p>
        <p className="">
          prize pool <span className="text-orange-600">₹100k</span>
        </p>
      </div>
    </section>
  );
};

export default EventContentComponent;
