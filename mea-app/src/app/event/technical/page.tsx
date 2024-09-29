"use client";
import PageTitleComponent from "@/Components/Common/PageTitleComponent";
import EventCardComponent from "@/Components/MainComponents/eventsComponents/EventCardComponent";
import React, { useEffect, useState } from "react";
import { fetchEvents } from "@/api/EventApi";
import { Event } from "@/api/EventApi";
import { ClipLoader } from "react-spinners";

const Page: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);
  return (
    <section className="mb-20">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#ffffff"} loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <PageTitleComponent
            mainTitle={"technical events"}
            spanTitle={
              <p className="">
                <span className="text-orange-600">technical</span>events
              </p>
            }
            className="md:text-[8rem] 2xl:text-[10rem] whitespace-nowrap"
          />
          <div className=" w-full h-auto flex items-center justify-center">
            <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-4">
              {events.map((event, index) =>
                event.category === "technical" ? (
                  <EventCardComponent
                    label={event.name}
                    link={`/event/technical/${event.id}`}
                    key={index}
                  />
                ) : null
              )}
            </section>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
