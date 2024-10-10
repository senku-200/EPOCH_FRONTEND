import React from "react";
interface Props {
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
const ParticipantInput: React.FC<Props> = ({
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 py-2.5 bg-transparent border border-gray-700 rounded focus:outline-none focus:ring focus:ring-orange-500 focus:border-0"
    />
  );
};

export default ParticipantInput;
