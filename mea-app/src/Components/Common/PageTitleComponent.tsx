import React, { ReactNode } from "react";
interface Props {
  mainTitle: String;
  spanTitle: ReactNode;
  className?: String;
}
const PageTitleComponent: React.FC<Props> = ({
  mainTitle,
  spanTitle,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full md:min-h-[400px] flex items-center justify-center`}
    >
      <p
        className={`hidden md:block font-bebas tracking-widest  text-[#212529] uppercase md:text-[12rem] 2xl:text-[15rem] font-bold absolute left-1/2 -translate-x-1/2  ${className}`}
      >
        {mainTitle}
      </p>
      <div className="text-white font-bebas flex flex-col items-center justify-center gap-3 md:text-5xl md:absolute">
        <div className="tracking-widest text-4xl">{spanTitle}</div>
        <span className="w-10 h-1 rounded-full bg-orange-600"></span>
      </div>
    </div>
  );
};

export default PageTitleComponent;
