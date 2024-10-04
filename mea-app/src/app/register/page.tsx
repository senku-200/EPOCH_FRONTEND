"use client";

// import EventForm from "@/app/components/EventForm";
import React from "react";
import { useRouter } from "next/navigation";
import EventForm from "../components/FormComponents/EventForm";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-auto w-screen">
      <EventForm />
    </div>
  );
};

export default Page;
