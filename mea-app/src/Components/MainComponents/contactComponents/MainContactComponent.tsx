import React from "react";
import ContactCard from "./ContactCard";
import { ContactDetails } from "@/types/ContactDetails";
import PageTitleComponent from "@/Components/Common/PageTitleComponent";
const MainContactComponent: React.FC = () => {
  return (
    <div>
      <PageTitleComponent
        mainTitle="contact us"
        spanTitle={
          <>
            <p className="tracking-widest">
              contact
              <span className="text-orange-600">us</span>
            </p>
          </>
        }
        className={"md:text-[9.2rem] 2xl:text-[10rem]"}
      />
      <div className="flex w-full h-auto items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
          {ContactDetails.map(
            (
              { name, committee, phoneNo }: any,
              index: React.Key | null | undefined
            ) => (
              <ContactCard
                key={index}
                name={name}
                committee={committee}
                phoneNo={phoneNo}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContactComponent;
