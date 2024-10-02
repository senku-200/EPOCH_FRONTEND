import React, { ReactNode } from "react";
interface PropTypes {
  title: string;
  content?: any;
}
const ContainerComponent: React.FC<PropTypes> = ({ title, content }) => {
  return (
    <section className="max-w-screen md:max-w-[calc(100%/3)] py-2">
      <article className="flex flex-col items-start justify-start gap-2">
        <header>
          <p className="text-[Inter] text-sm md:text-base font-extrabold underline underline-offset-4 text-white uppercase">{title}</p>
        </header>
        <main className="">
            <div className="text-[#aaaaaa] break-keep py-2 text-xs leading-relaxed lowercase">
                {content}
            </div>
        </main>
      </article>
    </section>
  );
};

export default ContainerComponent;
