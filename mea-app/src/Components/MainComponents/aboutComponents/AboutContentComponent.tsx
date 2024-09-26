import PageTitleComponent from "@/Components/Common/PageTitleComponent";
import React from "react";

const AboutContentComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <PageTitleComponent
        className={"md:text-[9rem]"}
        mainTitle={"about us"}
        spanTitle={
          <>
            <span className="text-orange-600">About</span> us{" "}
          </>
        }
      />
      <div className="p-10 flex flex-col items-center justify-center gap-5 border-2 border-orange-600 rounded-lg md:w-[1000px] break-keep">
        <h1 className="text-orange-600 font-extrabold font-bebas text-3xl">
          {" "}
          ABOUT THE DEPARTMENT{" "}
        </h1>
        <p className="text-center text-[poppins] text-md text-white">
          The department of Mechanical Engineering was established in the year
          2009. This department offers B.E. (Mechanical Engineering) from the
          academic year 2009 – 2010. It has well equipped, state-of-the-art
          laboratories that cater to the needs of the students, Principle study
          topics include fluid mechanics, thermodynamics, heat transfer, solid
          mechanics, materials engineering, manufacturing engineering, energy
          systems, dynamics & control systems Computer Aided Design (CAD),
          Computer Integrated Manufacturing (CIM) and other related topics. This
          broad and flexible program allows students to customize their program
          to meet their objectives and particular career goals. The department
          also organises several training programmes, workshops, seminars for
          staffs and students every year. Our faculty members explore research
          in various fields such as Micro Machining, IC Engines, Alternative
          Fuels, Nano Coatings, Composite materials, Coatings technology,
          Surface Engineering, Corrosion, Optimization, Nano Materials,
          Refrigeration and Air conditioning.
        </p>
        <a
          href="https://gcebargur.ac.in/22/about-us"
          className=""
          target="_blank"
          rel="noopener"
        >
          <button
            typeof="button"
            className="hover:bg-orange-600 text-orange-600 transition-all hover:scale-105 hover:text-white py-2 px-5 rounded-md uppercase font-bebas tracking-widest relative top-2 border border-orange-600"
          >
            more
          </button>
        </a>
      </div>
    </div>
  );
};

export default AboutContentComponent;
