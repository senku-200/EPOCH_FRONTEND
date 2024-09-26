import React, { useEffect, useState } from "react";
import axios from "axios";
import { Event, fetchEvents } from "@/api/EventApi";
import { Incharge, fetchIncharges } from "@/api/InchargeApi";
import { z } from "zod";

const API_ENDPOINT = "http://127.0.0.1:8000/register/";

const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  register_number: z
    .string()
    .min(1, { message: "Register number is required" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
});

const teamMemberSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  register_number: z
    .string()
    .min(1, { message: "Register number is required" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
});

type Participant = {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
};

const MAX_TEAM_MEMBERS = 3;

const EventForm: React.FC = () => {
  const [predefinedEvents, setPredefinedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchEvents();
        setPredefinedEvents(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchEventData();
  }, []);

  const [inchargeData, setInchargeData] = useState<Incharge[]>([]);
  useEffect(() => {
    const getInchargeData = async () => {
      try {
        const data = await fetchIncharges();
        setInchargeData(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getInchargeData();
  }, []);

  const [participant, setParticipant] = useState<Participant>({
    name: "",
    email: "",
    register_number: "",
    phone_number: "",
  });

  const handleParticipantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  const handleAddEvent = () => {
    if (selectedEvent !== null) {
      const event = predefinedEvents.find((e) => e.id === selectedEvent);
      if (event && !events.some((e) => e.id === event.id)) {
        setEvents([
          ...events,
          { ...event, team_members: event.is_team ? [] : undefined },
        ]);
        setSelectedEvent(null);
      }
    }
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleAddTeamMember = (eventIndex: number) => {
    const updatedEvents = events.map((event, i) =>
      i === eventIndex && (event.team_members?.length || 0) < MAX_TEAM_MEMBERS
        ? {
            ...event,
            team_members: [
              ...(event.team_members || []),
              { name: "", email: "", register_number: "", phone_number: "" },
            ],
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleTeamMemberChange = (
    eventIndex: number,
    memberIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedEvents = events.map((event, i) =>
      i === eventIndex
        ? {
            ...event,
            team_members: event.team_members?.map((member, j) =>
              j === memberIndex ? { ...member, [name]: value } : member
            ),
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleRemoveTeamMember = (eventIndex: number, memberIndex: number) => {
    const updatedEvents = events.map((event, i) =>
      i === eventIndex
        ? {
            ...event,
            team_members: event.team_members?.filter(
              (_, j) => j !== memberIndex
            ),
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleCopyTeamMembers = (sourceIndex: number, targetIndex: number) => {
    const sourceTeamMembers = events[sourceIndex].team_members || [];
    const updatedEvents = events.map((event, i) =>
      i === targetIndex
        ? {
            ...event,
            team_members: sourceTeamMembers.map((member) => ({ ...member })),
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const jsonData = {
      participant: participant,
      events: events,
    };
    // Validate participant data
    const participantValidation = participantSchema.safeParse(participant);
    if (!participantValidation.success) {
      setErrors(participantValidation.error.errors.map((err) => err.message));
      return;
    }

    // Validate team members
    for (const event of events) {
      if (event.team_members) {
        for (const member of event.team_members) {
          const memberValidation = teamMemberSchema.safeParse(member);
          if (!memberValidation.success) {
            setErrors((prev) => [
              ...prev,
              ...memberValidation.error.errors.map((err) => err.message),
            ]);
            return;
          }
        }
      }
    }

    // Clear previous errors
    setErrors([]);
    try {
      const response = await axios.post(API_ENDPOINT, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-900 text-white shadow-md space-y-8"
    >
      <h2 className="text-2xl font-semibold mb-4">Participant Information</h2>
      {errors.length > 0 && (
        <div className="mb-4 text-red-500">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Name"
          value={participant.name}
          onChange={handleParticipantChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          name="email"
          placeholder="Email"
          value={participant.email}
          onChange={handleParticipantChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          name="register_number"
          placeholder="Register Number"
          value={participant.register_number}
          onChange={handleParticipantChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          name="phone_number"
          placeholder="Phone Number"
          value={participant.phone_number}
          onChange={handleParticipantChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Events</h2>

      {events.map((event, eventIndex) => (
        <div
          key={event.id}
          className="mt-6 bg-gray-800 p-4 rounded-lg space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
            <button
              type="button"
              onClick={() => handleDeleteEvent(event.id)}
              className="py-1 px-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
            >
              Delete Event
            </button>
          </div>

          {event.is_team && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Team Members</h4>
              {event.team_members?.map((teamMember, memberIndex) => (
                <div
                  key={memberIndex}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >
                  <input
                    name="name"
                    placeholder="Team Member Name"
                    value={teamMember.name}
                    onChange={(e) =>
                      handleTeamMemberChange(eventIndex, memberIndex, e)
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <input
                    name="email"
                    placeholder="Team Member Email"
                    value={teamMember.email}
                    onChange={(e) =>
                      handleTeamMemberChange(eventIndex, memberIndex, e)
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <input
                    name="register_number"
                    placeholder="Team Member Register Number"
                    value={teamMember.register_number}
                    onChange={(e) =>
                      handleTeamMemberChange(eventIndex, memberIndex, e)
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <input
                    name="phone_number"
                    placeholder="Team Member Phone Number"
                    value={teamMember.phone_number}
                    onChange={(e) =>
                      handleTeamMemberChange(eventIndex, memberIndex, e)
                    }
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveTeamMember(eventIndex, memberIndex)
                    }
                    className="py-1 px-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddTeamMember(eventIndex)}
                className="py-1 px-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
              >
                Add Team Member
              </button>
              {events.filter((e) => e.is_team).length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    handleCopyTeamMembers(eventIndex - 1, eventIndex)
                  }
                  className="py-1 px-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                >
                  {`Copy Team Members from ${event.name}`}
                </button>
              )}
            </div>
          )}
        </div>
      ))}

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
                {event.name}
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

      <button
        type="submit"
        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm; 