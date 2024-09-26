import MainContactComponent from "@/Components/MainComponents/contactComponents/MainContactComponent";
import React from "react";
import Map from "@/Components/MainComponents/contactComponents/Map";

const page = () => {
  return (
    <section className="min-h-screen bg-black">
      <MainContactComponent />
      <div className="flex items-center justify-center py-10 -z-10">
        <Map />
      </div>
    </section>
  );
};

export default page;
