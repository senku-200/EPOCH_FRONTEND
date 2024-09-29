"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailedViewComponent from "@/Components/Common/DetailedViewComponent";
import {
  API_URL_EVENTS,
  API_URL_Incharge,
  Incharge,
  Event,
} from "@/api/EventApi";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
interface props {
  id: string;
}
const EventDetailView: React.FC<props> = ({ id }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [incharges, setIncharges] = useState<Incharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEventAndIncharges = async () => {
      try {
        setLoading(true);

        const response_event = await axios.get(`${API_URL_EVENTS}${id}`);
        setEvent(response_event.data);

        const response_incharges = await axios.get(API_URL_Incharge);
        const allIncharges: Incharge[] = response_incharges.data;

        // Filter incharges based on event category
        const filteredIncharges = allIncharges.filter(
          (incharge) =>
            Array.isArray(incharge.category) &&
            incharge.category.some(
              (cat: { name: string }) =>
                cat.name === response_event.data.category
            )
        );

        setIncharges(filteredIncharges);
      } catch (error) {
        setError("Failed to fetch event data.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndIncharges();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#fff"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div>
      <DetailedViewComponent inchargeDetails={incharges} event={event} />
    </div>
  );
};

export default EventDetailView;
