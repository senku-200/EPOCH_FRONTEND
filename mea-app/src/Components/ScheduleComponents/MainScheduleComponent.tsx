"use client";
import React, { useEffect, useState } from "react";
import PageTitleComponent from "../Common/PageTitleComponent";
import ScheduleTableComponent from "./ScheduleTableComponent";
import { fetchEvents, Event } from "@/api/EventApi";
import { ClipLoader } from "react-spinners";

const MainScheduleComponent: React.FC = () => {
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
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#ffffff"} loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <PageTitleComponent
            mainTitle={"schedule"}
            spanTitle={
              <>
                <span className="text-orange-600">Sched</span>ule
              </>
            }
          />
          <div className="w-full md:px-10 2xl:px-40">
            <ScheduleTableComponent events={events} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScheduleComponent;
