import React, { useEffect, useState } from "react";
import axios from "axios";
import { Event, fetchEvents } from "@/api/EventApi";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const API_ENDPOINT = "https://epoch-backend.vercel.app/register/";
// const API_ENDPOINT = "http://127.0.0.1:8000/register/";

const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  register_number: z
    .string()
    .min(1, { message: "Register number is required" })
    .max(15, { message: "Register number must be at most 15 character's" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 10 digits" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  year: z.string().min(1, { message: "Academic is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  college: z.string().min(1, { message: "College is required" }),
});

type Participant = {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
  gender: string;
  year: string;
  department: string;
  college: string;
};

// const MAX_TEAM_MEMBERS = 3;

const EventForm: React.FC = () => {
  const router = useRouter();
  const [predefinedEvents, setPredefinedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedGender, setGender] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedYear, setYear] = useState<string>("");
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchEvents();
        setPredefinedEvents(data);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const [participant, setParticipant] = useState<Participant>({
    name: "",
    email: "",
    register_number: "",
    phone_number: "",
    gender: "",
    year: "",
    department: "",
    college: "",
  });

  const handleParticipantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
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
      i === eventIndex &&
      (event.team_members?.length || 0) <
        (event.max_team_size != null ? event.max_team_size - 1 : 3)
        ? {
            ...event,
            team_members: [
              ...(event.team_members || []),
              {
                name: "",
                email: "",
                register_number: "",
                phone_number: "",
                gender: "",
                year: "",
                department: "",
                college: "",
              },
            ],
          }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleTeamMemberChange = (
    eventIndex: number,
    memberIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
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
    setIsSubmitting(true);

    const jsonData = {
      participant: participant,
      events: events,
      total_amount: calculateTotalPrice(),
    };

    const participantValidation = participantSchema.safeParse(participant);
    if (!participantValidation.success) {
      setErrors(participantValidation.error.errors.map((err) => err.message));
      setIsSubmitting(false);
      return;
    }

    if (events.length < 1) {
      setErrors(["No event Has Been Selected"]);
      setIsSubmitting(false);
      return;
    }

    for (const event of events) {
      if (event.team_members) {
        for (const member of event.team_members) {
          const memberValidation = participantSchema.safeParse(member);
          if (!memberValidation.success) {
            setErrors((prev) => [
              ...prev,
              ...memberValidation.error.errors.map((err) => err.message),
            ]);
            setIsSubmitting(false);
            return;
          }
        }
      }
    }

    setErrors([]);

    try {
      console.log(JSON.stringify(jsonData));
      const response = await axios.post(API_ENDPOINT, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        if (calculateTotalPrice() == 0) {
          return router.push(`/register/success`);
        } else {
          router.push(
            `/register/payment?data=${encodeURIComponent(
              JSON.stringify(jsonData)
            )}`
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setIsSubmitting(false);
    }
  };
  const calculateTotalPrice = () => {
    return events.reduce((total, event) => {
      if (selectedGender == "female" && !event.is_team) {
        return parseFloat(total.toString());
      } else {
        return parseFloat(total.toString()) + parseFloat(event.register_amount);
      }
    }, 0);
  };

  const getRegisterAmount = (event: Event) => {
    if (selectedGender == "female" && !event.is_team) {
      return 0;
    } else {
      return event.register_amount;
    }
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    handleParticipantChange(e);
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    handleParticipantChange(e);
  };
  const handleGenderChangeTeam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    handleParticipantChange(e);
  };
  const handleYearChangeTeam = (
    eventIndex: number,
    memberIndex: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setYear(e.target.value);
    handleTeamMemberChange(eventIndex, memberIndex, e);
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#ffffff"} loading={isLoading} size={50} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-900 text-white shadow-md space-y-8"
          encType="multipart/form-data"
        >
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <ClipLoader color={"#ffffff"} loading={isSubmitting} size={50} />
            </div>
          )}
          <h2 className="text-2xl font-semibold mb-4">
            Participant Information
          </h2>
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
            />{" "}
            <select
              value={participant.gender || ""}
              onChange={handleParticipantChange}
              name="gender"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500 capitalize"
            >
              <option value="" disabled>
                select a gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>{" "}
            <select
              value={participant.year || ""}
              onChange={handleParticipantChange}
              name="year"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500 capitalize"
            >
              <option value="" disabled>
                select the academic year
              </option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
            </select>
            <input
              name="department"
              placeholder="Department"
              value={participant.department}
              onChange={handleParticipantChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />{" "}
            <input
              name="college"
              placeholder="College"
              value={participant.college}
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
                      />{" "}
                      <select
                        value={teamMember.gender || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(eventIndex, memberIndex, e)
                        }
                        name="gender"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500 capitalize"
                      >
                        <option value="" disabled>
                          select a gender
                        </option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>{" "}
                      <select
                        value={teamMember.year || ""}
                        onChange={(e) =>
                          handleTeamMemberChange(eventIndex, memberIndex, e)
                        }
                        name="year"
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500 capitalize"
                      >
                        <option value="" disabled>
                          select the academic year
                        </option>
                        <option value="1 year">1 year</option>
                        <option value="2 year">2 year</option>
                        <option value="3 year">3 year</option>
                        <option value="4 year">4 year</option>
                      </select>
                      <input
                        name="department"
                        placeholder="Department"
                        value={teamMember.department}
                        onChange={(e) =>
                          handleTeamMemberChange(eventIndex, memberIndex, e)
                        }
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                      />{" "}
                      <input
                        name="college"
                        placeholder="College"
                        value={teamMember.college}
                        onChange={(e) =>
                          handleTeamMemberChange(eventIndex, memberIndex, e)
                        }
                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
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

                  {event.is_team &&
                    events.some(
                      (e, i) =>
                        e.is_team &&
                        (e.team_members?.length ?? 0) &&
                        i !== eventIndex
                    ) && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">
                          Copy Team Members
                        </h4>
                        {events.map(
                          (e, i) =>
                            e.is_team &&
                            (e.team_members?.length ?? 0) &&
                            i !== eventIndex && (
                              <button
                                key={i}
                                type="button"
                                onClick={() =>
                                  handleCopyTeamMembers(i, eventIndex)
                                }
                                className="py-1 px-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-500 mb-2"
                              >
                                Copy from {e.name}
                              </button>
                            )
                        )}
                      </div>
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

          <div className="border-t pt-4 mt-4">
            <h3 className="text-xl font-semibold">
              Total Price: ₹{calculateTotalPrice()}
            </h3>
            <button
              type="submit"
              className="mt-4 w-full p-2 bg-green-600 text-white rounded-md"
            >
              Checkout
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EventForm;
