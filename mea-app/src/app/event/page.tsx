import EventCardComponent from "@/Components/MainComponents/eventsComponents/EventCardComponent";
import EventContentComponent from "@/Components/MainComponents/eventsComponents/EventContentComponent";
import React from "react";
const page = () => {
  return (
    <div className="min-h-screen bg-black pb-14">
      <EventContentComponent />
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-20 my-8">
        <EventCardComponent label="workshop" link={"event/workshop"} />
        <EventCardComponent label="technical" link={"event/technical"} />
        <EventCardComponent label="non technical" link={"event/non-technical"} />
      </section>
    </div>
  );
};

export default page;
