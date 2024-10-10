import React from "react";
interface Props {
  name: string;
  placeholder: string;
  value: string;
  handleTeamMemberChange: (
    eventIndex: number,
    memberIndex: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  eventIndex: number;
  memberIndex: number;
}
const TeamMemberInput: React.FC<Props> = ({
  name,
  placeholder,
  value,
  handleTeamMemberChange,
  eventIndex,
  memberIndex,
}) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleTeamMemberChange(eventIndex, memberIndex, e)}
      className="w-full p-2 bg-transparent border border-gray-600 rounded focus:outline-none focus:ring focus:ring-orange-500 focus:border-0"
    />
  );
};

export default TeamMemberInput;
