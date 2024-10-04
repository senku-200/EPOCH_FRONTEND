import { Event, Participant } from "@/api/EventApi";
import React from "react";
import ParticipantForm from "../Participant/ParticipantForm";
import TeamMemberForm from "../TeamMembersComponent/TeamMemberForm";
interface EventsProps {
  events: Event[];
  handleTeamMemberChange: (
    eventIndex: number,
    memberIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleDeleteEvent: (eventId: number) => void;
  handleRemoveTeamMember: (eventIndex: number, memberIndex: number) => void;
  handleAddTeamMember: (eventIndex: number) => void;
  handleCopyTeamMembers: (sourceIndex: number, targetIndex: number) => void;
}
const EventsComponent: React.FC<EventsProps> = ({
  events,
  handleTeamMemberChange,
  handleRemoveTeamMember,
  handleDeleteEvent,
  handleAddTeamMember,
  handleCopyTeamMembers,
}) => {
  return (
    <>
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
                <TeamMemberForm
                  key={memberIndex}
                  participant={teamMember}
                  handleTeamMemberChange={handleTeamMemberChange}
                  teamMember={teamMember}
                  eventIndex={eventIndex}
                  memberIndex={memberIndex}
                  handleRemoveTeamMember={handleRemoveTeamMember}
                />
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
                    e.team_members &&
                    e.team_members.length > 0 &&
                    i !== eventIndex
                ) && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Copy Team Members</h4>
                    {events.map(
                      (e, i) =>
                        e.is_team &&
                        e.team_members &&
                        e.team_members.length > 0 &&
                        i !== eventIndex && (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleCopyTeamMembers(i, eventIndex)}
                            className="py-1 px-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-500 mb-2 mr-2"
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
    </>
  );
};

export default EventsComponent;
