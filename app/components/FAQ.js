"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why are your books spirally binded?",
    answer:
      "Our founder, Nilshree, is a mother to a 10-year-old. Because of overuse, her son’s books have pages that come out easily. Also, not all kids have a good handling capacity when it comes to books. Just so that the pages remain intact and easily turnable, we have kept it spirally binded. As a byproduct, we have observed, the kids love it too.",
  },
  {
    question: "Why haven’t you provided answers at the end?",
    answer:
      "The worksheets are crafted with kid-friendly flair! Each shiny new topic kicks off with a sample solution to light the way. If that doesn't do the trick, kids can rally the troops—siblings, friends, or even parents—for a fun-filled bonding session!",
  },
  {
    question: "Why does Brain Teasers not have an index?",
    answer:
      "We have deliberately not added an index. It came to our notice that the current format of guarded parenting was keeping kids from enjoying the randomness and they were missing an important aspect, GO WITH THE FLOW.",
  },
  {
    question: "Do you accept bulk or corporate orders?",
    answer:
      "Yes, absolutely! We specialize in customized bulk orders and corporate gifting. Please reach out to us directly via the WhatsApp button to discuss your specific requirements and special pricing.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days depending on your location. Once your order is processed and dispatched, you'll receive a notification with tracking details.",
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border border-zinc-200 rounded-xl bg-white overflow-hidden mb-4 transition-all duration-200 hover:border-zinc-300 shadow-sm">
      <button
        onClick={onClick}
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-zinc-900 pr-4">
          {faq.question}
        </h3>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-zinc-600 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  return (
    <section className="py-12 md:py-16 max-w-3xl mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-zinc-600 text-lg">
          Find answers to common questions about our books and hampers.
        </p>
      </div>
      <div className="flex flex-col">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}
