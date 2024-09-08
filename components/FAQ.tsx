"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What is Generate Avatar?",
    answer: <div className="space-y-2 leading-relaxed">
        Generate-Avatar.com is a cutting-edge tool designed to seamlessly create distinctive avatars using artificial intelligence, ideal for enhancing profiles across various digital platforms.    </div>,
  },
  {
    question: "How does Generate Avatar work?",
    answer: (
      <p>
          Simply enter a description of the avatar you envision, choose your preferred style and colors, and hit the generate button. It’s really that straightforward!      </p>
    ),
  },
  {
    question: "Can I use the avatars for commercial purposes?",
    answer: (
        <div className="space-y-2 leading-relaxed">
            Yes, indeed! You own the copyright to every avatar you produce with our tool. You are free to use them in your commercial projects or market them as you see fit.
        </div>
    ),
  },
    {
        question: "What kind of avatars can I create?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                With Generate-Avatar.com, you have the ability to create a wide range of avatars that suit any digital environment. Whether you’re aiming for a modern, vibrant, or subtle design, our AI is equipped to meet your specifications and help you develop avatars that perfectly match your project’s identity and branding.
            </div>
        ),
    },
    {
        question: "Do I need to be skilled in design to use Generate Avatar?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                Not at all! Generate-Avatar.com is designed to be intuitive and easy to use, removing the need for any previous design expertise. Just let our platform handle the details, and you focus on creating the perfect avatar.            </div>
        ),
    },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col justify-center text-left basis-1/2">
          {/*<p className="inline-block font-semibold text-primary mb-4">FAQ</p>*/}
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
