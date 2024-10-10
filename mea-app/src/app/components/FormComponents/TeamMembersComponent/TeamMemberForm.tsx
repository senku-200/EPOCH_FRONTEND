import React from "react";
import { Participant } from "@/api/EventApi";
import TeamMemberInput from "./TeamMemberInput";
import TeamMemberSelection from "./TeamMemberSelection";
interface Props {
  participant: Participant;
  handleTeamMemberChange: (
    eventIndex: number,
    memberIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  teamMember: Participant;
  eventIndex: number;
  memberIndex: number;
  handleRemoveTeamMember: (eventIndex: number, memberIndex: number) => void;
}

const TeamMemberForm: React.FC<Props> = ({
  teamMember,
  handleTeamMemberChange,
  eventIndex,
  memberIndex,
  handleRemoveTeamMember,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      <TeamMemberInput
        name="name"
        placeholder="Team Member Name"
        value={teamMember.name}
        handleTeamMemberChange={handleTeamMemberChange}
        eventIndex={eventIndex}
        memberIndex={memberIndex}
      />{" "}
      <TeamMemberInput
        name="email"
        placeholder="Team Member Email"
        value={teamMember.email}
        handleTeamMemberChange={handleTeamMemberChange}
        eventIndex={eventIndex}
        memberIndex={memberIndex}
      />{" "}
      <TeamMemberInput
        name="register_number"
        placeholder="Team Member Register Number"
        value={teamMember.register_number}
        handleTeamMemberChange={handleTeamMemberChange}
        eventIndex={eventIndex}
        memberIndex={memberIndex}
      />
      <TeamMemberInput
        name="phone_number"
        placeholder="Team Member Phone Number"
        value={teamMember.phone_number}
        handleTeamMemberChange={handleTeamMemberChange}
        eventIndex={eventIndex}
        memberIndex={memberIndex}
      />{" "}
      <TeamMemberSelection
        value={teamMember.gender || ""}
        onChange={(e) => handleTeamMemberChange(eventIndex, memberIndex, e)}
        name="gender"
        options={[
          { name: "male", value: "male" },
          { name: "female", value: "female" },
        ]}
      />
      <TeamMemberSelection
        value={teamMember.year || ""}
        onChange={(e) => handleTeamMemberChange(eventIndex, memberIndex, e)}
        name="year"
        options={[
          { name: "1 year", value: "1 year" },
          { name: "2 year", value: "2 year" },
          { name: "3 year", value: "3 year" },
          { name: "4 year", value: "4 year" },
        ]}
      />
      <TeamMemberInput
        name="department"
        placeholder="Department"
        value={teamMember.department}
        handleTeamMemberChange={handleTeamMemberChange}
        eventIndex={eventIndex}
        memberIndex={memberIndex}
      />{" "}
      <TeamMemberInput
        name="college"
        placeholder="College"
        value={teamMember.college}
        handleTeamMemberChange={handleTeamMemberChange}
        eventIndex={eventIndex}
        memberIndex={memberIndex}
      />
      <button
        type="button"
        onClick={() => handleRemoveTeamMember(eventIndex, memberIndex)}
        className="py-1 px-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default TeamMemberForm;
