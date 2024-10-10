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
const ParticipantSelection: React.FC<Props> = ({
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
      className="w-full p-2 py-2.5 bg-black border border-gray-600 rounded focus:outline-none focus:ring focus:ring-orange-500 capitalize"
    >
      <option value="" className="bg-transparent focus:bg-black" disabled>
        {name}
      </option>
      {options.map(({ value, name }, index) => (
        <option value={value} key={index} className="">
          {name}
        </option>
      ))}
    </select>
  );
};

export default ParticipantSelection;
