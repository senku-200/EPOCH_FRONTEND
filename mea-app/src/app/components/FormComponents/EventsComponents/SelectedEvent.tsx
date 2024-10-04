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
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value="" disabled>
          Select an event
        </option>
        {predefinedEvents
          .filter((event) => !events.some((e) => e.id === event.id))
          .map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - ₹{getRegisterAmount(event)}
            </option>
          ))}
      </select>
      <button
        type="button"
        onClick={handleAddEvent}
        className="ml-4 py-1 px-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
      >
        Add Event
      </button>
    </div>
  );
};

export default SelectedEvent;
