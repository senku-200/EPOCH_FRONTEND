import React from "react";
interface ErrorProps {
  errors: string[];
}
const ErrorComponent: React.FC<ErrorProps> = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <div className="mb-4 text-red-500">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ErrorComponent;
