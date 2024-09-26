import Link from "next/link";
import React from "react";

const RegisterBtnComponent: React.FC = () => {
  return (
    <Link href={"/register"}>
      <button
        type="button"
        className="transition-all text-lg px-4 py-2 font-normal font-protest uppercase outline-none border rounded-md border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
      >
        register
      </button>
    </Link>
  );
};

export default RegisterBtnComponent;
