import React, { useState } from "react";
import { STUDIO_FAQS } from "../data";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {STUDIO_FAQS.map((faq, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="border-b border-soft-gray bg-pure-white transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full py-5 flex justify-between items-center text-left hover:text-electric-blue transition-colors cursor-pointer group"
              id={`faq-btn-${index}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-electric-blue/40 font-semibold uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans font-bold text-sm md:text-base text-on-surface group-hover:text-electric-blue transition-colors">
                  {faq.question}
                </span>
              </div>
              <span
                className={`transform transition-transform duration-300 p-1 bg-background-gray rounded-full text-on-surface-variant group-hover:text-electric-blue ${
                  isOpen ? "rotate-180 bg-electric-blue/10 text-electric-blue" : ""
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </button>

            {/* Answer body panel with dynamic heights */}
            <div
              className={`transition-all duration-300 ease-out flow-root ${
                isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="pl-8 text-xs md:text-sm text-on-surface-variant leading-relaxed font-sans max-w-2xl">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
