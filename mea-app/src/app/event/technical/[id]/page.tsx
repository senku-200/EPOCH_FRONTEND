import EventDetailView from "@/Components/Common/EventDetailView";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EventDetailView id={params.id} />
    </div>
  );
};

export default Page;
