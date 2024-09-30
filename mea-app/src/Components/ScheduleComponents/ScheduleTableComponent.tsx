import { scheduleDetails } from "@/types/ScheduleDetails";
import React, { ReactNode } from "react";
import { Event } from "@/api/EventApi";
interface props{
  events:Event[];
}

const ScheduleTableComponent:React.FC<props> = ({events}) => {

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
          {events.map((event, index) => (
            <tr className="hover:bg-orange-500" key={index}>
              <td className="border px-4 py-2 text-center">{index+1}.</td>
              <td className="border px-4 py-2">{event.name}</td>
              <td className="border px-4 py-2 text-center">{event.day}</td>
              <td className="border px-4 py-2 text-center">{event.timing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTableComponent;
