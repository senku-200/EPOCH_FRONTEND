import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}
const LoadinComponentForm: React.FC<Props> = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#ffffff"} loading={isLoading} size={50} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default LoadinComponentForm;
