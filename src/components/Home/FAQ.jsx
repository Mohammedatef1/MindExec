import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import FAQItem from "./FAQItem";

const QUESTIONS = [
  {
    question: "What is BUGSPY and what does it do?",
    answer: "BUGSPY is a web vulnerability scanner that automatically detects security flaws in websites and web apps, helping developers identify and fix issues like SQL injection, XSS, and misconfigurations.",
  },
  {
    question: "Who should use BUGSPY?",
    answer: "BUGSPY is designed for developers, system admins, and cybersecurity teams who want a simple yet effective way to secure their web applications.",
  },
  {
    question: "What types of vulnerabilities can BUGSPY detect?",
    answer: "BUGSPY scans for common threats including SQL injection, XSS, command injection, authentication flaws, sensitive data exposure, and insecure configurations.",
  },
  {
    question: "Does BUGSPY support both automated and manual scanning?",
    answer: "Yes, BUGSPY offers automated scanning and allows manual testing for deeper analysis by security professionals.",
  },
  {
    question: "How are scan results presented to the user?",
    answer: "BUGSPY generates real-time reports that include vulnerability details, severity levels, and suggested fixes in a clear and organized format.",
  },
  {
    question: "What technologies is BUGSPY built with?",
    answer: "BUGSPY is built using React.js, Tailwind CSS, Node.js, Express, MongoDB, and integrates tools like OWASP ZAP and Burp Suite.",
  },
];

const FAQ = () => {
  return (
    <section>
      <MaxWidthWrapper className="max-w-4xl">
        <h2 className="text-heading text-main font-bold">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 mt-6 md:mt-8 lg:mt-10">
          {QUESTIONS.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQ;
