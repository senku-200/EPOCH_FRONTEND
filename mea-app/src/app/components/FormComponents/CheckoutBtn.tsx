import React from "react";
interface Props {}
const CheckoutBtn: React.FC = () => {
  return (
    <button
      type="submit"
      className="mt-4 w-full p-2 bg-orange-600 hover:bg-orange-700  text-white rounded-md"
    >
      Checkout
    </button>
  );
};

export default CheckoutBtn;
