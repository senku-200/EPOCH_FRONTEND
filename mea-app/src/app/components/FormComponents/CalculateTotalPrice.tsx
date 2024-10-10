import React, { ReactNode } from "react";
interface Props {
  calculateTotalPrice: ReactNode;
}
const CalculateTotalPrice: React.FC<Props> = ({ calculateTotalPrice }) => {
  return (
    <h3 className="text-xl font-semibold">
      Total Price: ₹{calculateTotalPrice}
    </h3>
  );
};

export default CalculateTotalPrice;
