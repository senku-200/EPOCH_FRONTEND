import Link from "next/link";
import React from "react";
interface props{
  styling?:string;
}
const RegisterBtnComponent: React.FC<props>= ({styling}) => {
  return (
    <Link href={"/register"}>
      <button
        type="button"
        className={`transition-all text-lg px-4 py-2 font-normal font-protest uppercase outline-none border rounded-md border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white ${styling}`}
      >
        register
      </button>
    </Link>
  );
};

export default RegisterBtnComponent;
