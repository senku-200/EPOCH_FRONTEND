import React from "react";
interface option {
  name: string;
  value: string;
}
interface Props {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options: option[];
}
const TeamMemberSelection: React.FC<Props> = ({
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <select
      value={value || ""}
      onChange={onChange}
      name={name}
      className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500 capitalize"
    >
      <option value="" disabled>
        {name}
      </option>
      {options.map(({ value, name }, index) => (
        <option value={value} key={index}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default TeamMemberSelection;
