import { Event } from "@/api/EventApi";
import React from "react";
interface Props {
  selectedEvent: any;
  setSelectedEvent: (e: any) => void;
  predefinedEvents: Event[];
  getRegisterAmount: (event: Event) => any;
  handleAddEvent: any;
  events: Event[];
}

const SelectedEvent: React.FC<Props> = ({
  selectedEvent,
  setSelectedEvent,
  predefinedEvents,
  getRegisterAmount,
  handleAddEvent,
  events,
}) => {
  return (
    <div className="flex items-center mt-4">
      <select
        value={selectedEvent || ""}
        onChange={(e) => setSelectedEvent(Number(e.target.value))}
        className="w-full p-2 bg-black border border-gray-600 rounded focus:outline-none focus:ring focus:ring-orange-500 focus:border-0 py-3"
      >
        <option value="" disabled>
          Select an event
        </option>
        {predefinedEvents
          .filter((event) => !events.some((e) => e.id === event.id))
          .map((event) => (
            <option key={event.id} value={event.id} className="">
              {event.name} - ₹{getRegisterAmount(event)}
            </option>
          ))}
      </select>
      <button
        type="button"
        onClick={handleAddEvent}
        className="ml-4 py-1 px-2 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500"
      >
        Add Event
      </button>
    </div>
  );
};

export default SelectedEvent;
