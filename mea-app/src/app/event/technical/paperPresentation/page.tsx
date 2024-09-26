import DetailedViewComponent from "@/Components/Common/DetailedViewComponent";
import PageTitleComponent from "@/Components/Common/PageTitleComponent";
import React from "react";

const page: React.FC = () => {
  return (
    <section className="">
      <div className="">
        <PageTitleComponent
          mainTitle={"paper presentation"}
          spanTitle={
            <p>
              paper<span className="text-orange-600">presentation</span>
            </p>
          }
          className={"md:text-[8rem] text-nowrap"}
        />
      </div>
      <div className="">
        <DetailedViewComponent
          title={"paper presentation"}
          instruction={
            "In this event, an already published paper can be chosen as a topic, or a specific topic can be presented in front of a committee specializing in streams such as thermal, design, and manufacturing. Marks will be allocated based on presentation skills, knowledge of the chosen topic,and more."
          }
          inchargeDetails={[
            {
              name: "Logendran",
              phoneNumber: 6384848484,
            },
            {
              name: "Tamilarasan",
              phoneNumber: 6363638846,
            },
            {
              name: "Paul R Grace Lincoln",
              phoneNumber: 9484848484,
            },
          ]}
          custom={
            <div className=" flex flex-col gap-5">
              <div>
                <h3 className="font-bebas text-2xl md:text-3xl text-white tracking-widest">
                  <span className="text-orange-600">Event</span> Details:
                </h3>
                <div className="text-white font-bebas">
                  <p className="text-lg md:text-xl tracking-wide">
                    No. of participants:{" "}
                    <span className="text-orange-600">1</span>
                  </p>
                  <p className="text-sm md:text-base">
                    Time Limit: <span className="text-orange-600">15 mins</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-bebas text-2xl md:text-3xl text-white uppercase">
                  Send your <span className="text-orange-600">PPTs</span> to us:
                </h3>
                <div className="font-bebas">
                  <p className="text-orange-600 text-lg md:text-xl">Mail ID:</p>
                  <p className="text-white font-poppins text-sm md:text-base">
                    mech@info.com
                  </p>
                  <p className="text-orange-600 text-lg md:text-xl">
                    Details to attach:
                  </p>
                  <p className="text-white capitalize">
                    Name, College Name, Year & Dept, Mobile Number
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default page;
