import { scheduleDetails } from "@/types/ScheduleDetails";
import { s } from "framer-motion/client";
import React, { ReactNode } from "react";

const ScheduleTableComponent = () => {
  function index(
    value: { "s.no": number; event: string; day: number; timings: string },
    index: number,
    array: { "s.no": number; event: string; day: number; timings: string }[]
  ): ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="overflow-x-auto border-box rounded-md mt-10 md:mt-0 cursor-pointer">
      <table className="min-w-full table-auto bg-black text-white border border-gray-700 font-bebas text-xl text-center">
        <thead className="bg-black">
          <tr className="text-orange-600">
            <th className="md:px-4 py-2">S.No</th>
            <th className="px-4 py-2">Event</th>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Timings</th>
          </tr>
        </thead>
        <tbody>
          {scheduleDetails.map(({ s_no, event, day, timings }, index) => (
            <tr className="hover:bg-orange-500" key={index}>
              <td className="border px-4 py-2 text-center">{s_no}.</td>
              <td className="border px-4 py-2">{event}</td>
              <td className="border px-4 py-2 text-center">Day {day}</td>
              <td className="border px-4 py-2 text-center">{timings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTableComponent;
