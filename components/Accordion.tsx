
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, toggleOpen }) => {
  return (
    <div className="mb-2 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg overflow-hidden">
      <button 
        className="w-full text-left p-4 flex justify-between items-center bg-white dark:bg-encora-green/50 hover:bg-encora-gray dark:hover:bg-encora-green/30 transition-colors" 
        onClick={toggleOpen}
      >
        <span className="text-base font-semibold text-encora-text dark:text-white pr-4">{title}</span>
        <span className={`transform transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}>
          <FaChevronDown className="text-lg text-encora-green dark:text-encora-mint" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="p-4 bg-encora-gray/50 dark:bg-encora-green/20">
          <p className="text-sm text-encora-text/80 dark:text-white/80 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

const defaultAccordionItems = [
  {
    title: "Sign up for free",
    content: "Start your journey with a 34-day trial. It's easy no credit card or commitment.",
  },
  {
    title: "Easy to use",
    content:
      "Our app is designed to be user-friendly and easy to use. We want to provide a seamless experience for your users so that you can focus on what matters.",
  },
  {
    title: "Focus on what matters",
    content:
      "With better financial management, you can reduce money-related stress and focus on what matters most. More to come.",
  },
];

interface AccordionProps {
  items?: { title: string; content: string }[];
  title?: string;
  content?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, title, content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If single title/content provided, use that
  if (title && content) {
    return (
      <div className="mb-2">
        <AccordionItem
          title={title}
          content={content}
          isOpen={openIndex === 0}
          toggleOpen={() => toggleItem(0)}
        />
      </div>
    );
  }

  // Otherwise use items array
  const accordionItems = items || defaultAccordionItems;
  return (
    <div className="w-full">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleOpen={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
