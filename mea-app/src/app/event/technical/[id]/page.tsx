// src/app/event/technical/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailedViewComponent from "@/Components/Common/DetailedViewComponent";
import { API_URL_EVENTS, API_URL_Incharge, Incharge } from "@/api/EventApi";
import { Event } from "@/api/EventApi";

const EventDetail = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [incharges, setIncharges] = useState<Incharge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventAndIncharges = async () => {
      try {
        const response_event = await axios.get(`${API_URL_EVENTS}${params.id}`);
        setEvent(response_event.data);

        const response_incharges = await axios.get(API_URL_Incharge);
        const allIncharges: Incharge[] = response_incharges.data;

        const filteredIncharges = allIncharges.filter((incharge) => {
          return (
            Array.isArray(incharge.category) &&
            incharge.category.some(
              (cat: { name: string }) =>
                cat.name === response_event.data.category
            )
          );
        });

        setIncharges(filteredIncharges);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndIncharges();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div>
      <DetailedViewComponent inchargeDetails={incharges} event={event} />
    </div>
  );
};

export default EventDetail;
