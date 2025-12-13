import { useState } from "react";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import AccordionItem from "./AccordionItem";

const QUESTIONS = [
  {
    question: "What is MindExec and what does it do?",
    answer: "MindExec is a web vulnerability scanner that automatically detects security flaws in websites and web apps, helping developers identify and fix issues like SQL injection, XSS, and misconfigurations.",
  },
  {
    question: "Who should use MindExec?",
    answer: "MindExec is designed for developers, system admins, and cybersecurity teams who want a simple yet effective way to secure their web applications.",
  },
  {
    question: "What types of vulnerabilities can MindExec detect?",
    answer: "MindExec scans for common threats including SQL injection, XSS, command injection, authentication flaws, sensitive data exposure, and insecure configurations.",
  },
  {
    question: "Does MindExec support both automated and manual scanning?",
    answer: "Yes, MindExec offers automated scanning and allows manual testing for deeper analysis by security professionals.",
  },
  {
    question: "How are scan results presented to the user?",
    answer: "MindExec generates real-time reports that include vulnerability details, severity levels, and suggested fixes in a clear and organized format.",
  },
  {
    question: "What technologies is MindExec built with?",
    answer: "MindExec is built using React.js, Tailwind CSS, Node.js, Express, MongoDB, and integrates tools like OWASP ZAP and Burp Suite.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeIndexHandler = (i) => {
    if (activeIndex === i) return setActiveIndex(null);
    setActiveIndex(i)
  };

  return (
    <section id="faq" className="py-10 md:py-20 lg:py-32">
      <MaxWidthWrapper className="max-w-4xl">
        <h2 className="text-heading text-main font-bold">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-y-4 lg:gap-y-6 mt-6 md:mt-8 lg:mt-10">
          {QUESTIONS.map((item, index) => (
            <AccordionItem
              key={index}
              activeIndexHandler={() => activeIndexHandler(index)}
              opened={activeIndex === index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQ;
