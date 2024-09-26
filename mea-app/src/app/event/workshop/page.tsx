import PageTitleComponent from "@/Components/Common/PageTitleComponent";
import EventCardComponent from "@/Components/MainComponents/eventsComponents/EventCardComponent";
import React from "react";
import { TechincalDetails } from "@/types/TechnicalDetail";
import { WorkShopDetails } from "@/types/WorkShopDetails";
const page = () => {
  return (
    <section className="mb-20">
      <PageTitleComponent
        mainTitle={"workshop"}
        spanTitle={
          <p className="">
            <span className="text-orange-600">work</span>shop
          </p>
        }
        className="md:text-[8rem] 2xl:text-[10rem] whitespace-nowrap"
      />
      <div className=" w-full h-auto flex items-center justify-center">
        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-4">
          {WorkShopDetails.map(({ label, link }, index) => (
            <EventCardComponent label={label} link={link} key={index} />
          ))}
        </section>
      </div>
    </section>
  );
};

export default page;
