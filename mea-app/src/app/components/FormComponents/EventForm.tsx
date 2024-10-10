import React, { useState } from "react";
import { useEffect } from "react";
import { fetchEvents } from "@/api/EventApi";
import ParticipantForm from "./Participant/ParticipantForm";
import { Participant, Event } from "@/api/EventApi";
import ErrorComponent from "./ErrorComponents/ErrorComponent";
import { useRouter } from "next/navigation";
import EventsComponent from "./EventsComponents/EventsComponent";
import CalculateTotalPrice from "./CalculateTotalPrice";
import CheckoutBtn from "./CheckoutBtn";
import SelectedEvent from "./EventsComponents/SelectedEvent";
import LoadinComponentForm from "./LoadingComponents/LoadinComponentForm";
import LoadingComponent from "./LoadingComponents/LoadingComponent";
import { participantSchema } from "@/types/Form/ZodTypes";
import axios from "axios";

const API_ENDPOINT = "https://epoch-backend.vercel.app/register/";

const EventForm: React.FC = () => {
  const router = useRouter();
  const [predefinedEvents, setPredefinedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const calculateTotalPrice = () => {
    const payableEvents = events.filter(
      (event) => parseFloat(event.register_amount) > 0
    );

    let total = payableEvents.reduce((total, event) => {
      return participant.gender === "female" && !event.is_team
        ? total
        : total + parseFloat(event.register_amount);
    }, 0);

    const applicableEventCount =
      participant.gender === "female"
        ? payableEvents.filter((event) => event.is_team).length
        : payableEvents.length;

    const discount =
      applicableEventCount >= 5 ? 300 : applicableEventCount >= 3 ? 150 : 0;

    return Math.max(
      total > 0 && applicableEventCount >= 3 ? total - discount : total,
      0
    );
  };

  const getRegisterAmount = (event: Event) => {
    if (participant.gender == "female" && !event.is_team) {
      return 0;
    } else {
      return event.register_amount;
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Clear previous errors at the beginning
    setErrors([]);

    setIsSubmitting(true);

    const jsonData = {
      participant: participant,
      events: events,
      total_amount: calculateTotalPrice(),
    };

    // Validate participant
    const participantValidation = participantSchema.safeParse(participant);
    if (!participantValidation.success) {
      setErrors(participantValidation.error.errors.map((err) => err.message));
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Check if any event has been selected
    if (events.length < 1) {
      setErrors(["No event has been selected"]);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Validate team members for each event
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
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
          }
        }
      }
    }

    // If no errors, clear the errors array
    setErrors([]);

    try {
      // console.log(JSON.stringify(jsonData));

      const response = await axios.post(API_ENDPOINT, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        if (calculateTotalPrice() === 0) {
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
      setIsSubmitting(false);
    }
  };

  return (
    <LoadinComponentForm isLoading={isLoading}>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-black text-white shadow-md space-y-8"
        encType="multipart/form-data"
      >
        {<LoadingComponent isSubmitting={isSubmitting} />}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-600 font-bebas tracking-widest">
          Participant Information
        </h2>

        <ErrorComponent errors={errors} />

        <ParticipantForm
          participant={participant}
          handleParticipantChange={handleParticipantChange}
        />

        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-600 font-bebas tracking-widest">
          Events
        </h2>

        <EventsComponent
          events={events}
          handleTeamMemberChange={handleTeamMemberChange}
          handleDeleteEvent={handleDeleteEvent}
          handleRemoveTeamMember={handleRemoveTeamMember}
          handleAddTeamMember={handleAddTeamMember}
          handleCopyTeamMembers={handleCopyTeamMembers}
        />
        <SelectedEvent
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          predefinedEvents={predefinedEvents}
          getRegisterAmount={getRegisterAmount}
          handleAddEvent={handleAddEvent}
          events={events}
        />
        <div className="border-t pt-4 mt-4">
          <CalculateTotalPrice calculateTotalPrice={calculateTotalPrice()} />
          <CheckoutBtn />
        </div>
      </form>
    </LoadinComponentForm>
  );
};

export default EventForm;
