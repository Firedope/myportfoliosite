import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/utils";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FaqItem = ({ question, answer, isOpen, onToggle }: FaqItemProps) => {
  return (
    <div className="pt-6">
      <dt>
        <button
          className="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="font-medium text-gray-900">{question}</span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDown
              className={cn(
                "h-6 w-6 transform transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            />
          </span>
        </button>
      </dt>
      <dd
        className={cn(
          "mt-2 pr-12 overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-base text-gray-500">{answer}</p>
      </dd>
    </div>
  );
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Can't find the answer you're looking for? Contact our{" "}
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              customer support
            </a>{" "}
            team.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <dl className="space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
