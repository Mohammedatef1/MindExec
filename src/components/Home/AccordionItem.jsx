import { Plus } from "lucide-react";

const AccordionItem = ({ question, answer, opened, activeIndexHandler }) => {
  return (
    <div className="rounded-lg border border-gray-500 p-4 lg:p-6 bg-main/5">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={activeIndexHandler}>
        <h3 className="text-main font-semibold text-base md:text-lg lg:text-xl">{question}</h3>
        <Plus className={`size-5 transition-transform duration-300 transform mb-px ${opened ? "rotate-45" : "rotate-0"}`} />
      </div>
      <div className={`overflow-hidden grid transition-all duration-300 ease-in-out ${opened ? "grid-rows-[1fr] opacity-100 pt-1 md:pt-2" : "grid-rows-[0fr] opacity-0 p-0"}`}>
        <p className="overflow-hidden text-muted text-sm md:text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;