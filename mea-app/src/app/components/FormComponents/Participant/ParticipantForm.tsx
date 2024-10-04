import React from "react";
import ParticipantInput from "./ParticipantInput";
import { Participant } from "@/api/EventApi";
import ParticipantSelection from "./ParticipantSelection";
interface Props {
  participant: Participant;
  handleParticipantChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ParticipantForm: React.FC<Props> = ({
  participant,
  handleParticipantChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ParticipantInput
        name={"name"}
        placeholder={"Name"}
        value={participant.name || ""}
        onChange={handleParticipantChange}
      />
      <ParticipantInput
        name={"email"}
        placeholder={"Email"}
        value={participant.email || ""}
        onChange={handleParticipantChange}
      />
      <ParticipantInput
        name="register_number"
        placeholder="Register Number"
        value={participant.register_number}
        onChange={handleParticipantChange}
      />
      <ParticipantInput
        name="phone_number"
        placeholder="Phone Number"
        value={participant.phone_number}
        onChange={handleParticipantChange}
      />{" "}
      <ParticipantSelection
        name={"gender"}
        value={participant.gender || ""}
        onChange={handleParticipantChange}
        options={[
          { name: "male", value: "male" },
          { name: "female", value: "female" },
        ]}
      />{" "}
      <ParticipantSelection
        name={"year"}
        value={participant.year || ""}
        onChange={handleParticipantChange}
        options={[
          { name: "1 year", value: "1 year" },
          { name: "2 year", value: "2 year" },
          { name: "3 year", value: "3 year" },
          { name: "4 year", value: "4 year" },
        ]}
      />
      <ParticipantInput
        name="department"
        placeholder="Department"
        value={participant.department}
        onChange={handleParticipantChange}
      />{" "}
      <ParticipantInput
        name="college"
        placeholder="College"
        value={participant.college}
        onChange={handleParticipantChange}
      />
    </div>
  );
};

export default ParticipantForm;
