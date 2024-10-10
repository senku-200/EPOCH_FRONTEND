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
        <p className="text-center">
          Online registration: <span className="text-orange-600">₹150-₹300</span> (Registration fees vary by event)
        </p>
        <p className="text-center">
          On-spot registration: <span className="text-orange-600">₹200-₹350</span>
        </p>
        <p className="text-center">
          Free <span className="text-orange-600">accommodation</span> & <span className="text-orange-600">food</span> will be provided
        </p>
        <p className="text-center">
          For <span className="text-orange-600">3</span> days
        </p>
        <p className="text-center">
          Prize pool: <span className="text-orange-600">₹100k</span>
        </p>

        {/* Discount Information */}
        <div className="my-6 mx-3 p-4 md:mx-10 rounded-lg bg-black border border-orange-500">
          <h2 className="text-xl font-semibold text-orange-500">
            Special Offer!
          </h2>
          <p className="text-white">
            Register for at least <strong className="text-orange-600">3 payable events</strong> to get <strong className="text-orange-600">₹150 off</strong>, and <strong className="text-orange-600">5 payable events</strong> to get <strong className="text-orange-600">₹300 off</strong>!
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventContentComponent;
