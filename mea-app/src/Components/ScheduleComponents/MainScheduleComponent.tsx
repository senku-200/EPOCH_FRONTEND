import React from "react";
import PageTitleComponent from "../Common/PageTitleComponent";
import ScheduleTableComponent from "./ScheduleTableComponent";

const MainScheduleComponent: React.FC = () => {
  return (
    <div>
      <PageTitleComponent
        mainTitle={"schedule"}
        spanTitle={
          <>
            <span className="text-orange-600">Sched</span>ule
          </>
        }
      />
      <div className="w-full md:px-10 2xl:px-40">
        <ScheduleTableComponent />
      </div>
    </div>
  );
};

export default MainScheduleComponent;
