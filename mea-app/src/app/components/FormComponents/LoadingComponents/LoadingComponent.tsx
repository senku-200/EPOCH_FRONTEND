import React from "react";
import { ClipLoader } from "react-spinners";
interface Props {
  isSubmitting: boolean;
}
const LoadingComponent: React.FC<Props> = ({ isSubmitting }) => {
  return (
    isSubmitting && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <ClipLoader color={"#ffffff"} loading={isSubmitting} size={50} />
      </div>
    )
  );
};

export default LoadingComponent;
