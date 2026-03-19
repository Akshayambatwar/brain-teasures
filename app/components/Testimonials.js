"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Writa Bhattacharjee  ",
    rating: 5,
    review:
      "Brain Teasers is an amazing book for developing kids’ critical thinking. Every page is filled with different types of puzzles and challenges. No two subsequent challenges are similar, so kids don’t start solving mechanically. The best part is that kids have to figure what needs to be done to solve the puzzles on their own, which adds another dimension to the development of analytical and lateral thinking. This feature really sets it apart from other books of the kind. Both these features together create a kind of unpredictability that makes the book more fun and also infuses an aspect of real-life challenges in it. It doesn’t just aim to develop logical ability or verbal ability, but rather to improve the brain’s very approach to problem solving. I bought Brain Teasers for my nephews, and I absolutely love the book. I wish I was a kid again so that I could spend hours solving the book’s puzzles!",
  },
  {
    name: "Preeti Suman Gupta",
    rating: 5,
    review:
      "I recently bought a Brain Teasers for my kids and it’s been such a great experience! It’s fun, engaging, and perfectly challenging for children—my girl has been enjoying every moment while also learning to think more creatively and logically. I love how it keeps them away from screens and encourages problem-solving in such an exciting way. Also Got Brain Teasers for Juniors for my 3 year-old twins, and they absolutely love it! It’s fun, age-appropriate, and keeps them happily engaged while improving their thinking skills. They enjoy solving it together, which makes it even more special to watch. Such a great way to learn through play—highly recommended for little ones! Infact as an elder sister Preesha simply loves to be the boss snd teach them learn doing it with so much of conversation,love and laughter 😃 Highly recommend this to any parent looking for a fun and brain-boosting activity for their child!",
  },
  // {
  //   name: "Jayesh Bhusari",
  //   rating: 5,
  //   review:
  //     "We placed a corporate order of 40 customised gift hampers with Rarejoy. The personal touches and attention to detail really stood out. Timely delivery and good quality.",
  // },
  // {
  //   name: "Chanchal Wagh",
  //   rating: 5,
  //   review:
  //     "I am very happy with the gift hamper from Rare joy. The quality of the products is outstanding, and the service was smooth and reliable. The packaging was elegant and thoughtful and delivered on time. Thank you for such a wonderful experience. Truly...",
  // },
  // {
  //   name: "Veena Gulhane",
  //   rating: 3,
  //   review:
  //     "One stop solution for customised gift hamper at reasonable price. Ordered in bulk for women Day celebration in my office and they provided it promptly and in good price range. Service is good and clear communication. Superb quality",
  // },
  // {
  //   name: "Rohit Sharma",
  //   rating: 5,
  //   review:
  //     "Best place to get customized gift hampers. The quality of products is amazing and the packaging is top-notch. Highly recommended for corporate gifting!",
  // },
  // {
  //   name: "Priya Patel",
  //   rating: 4,
  //   review:
  //     "Beautiful hampers with great attention to detail. Ordered for Diwali gifts and everyone loved them. Will definitely order again for upcoming festivals.",
  // },
  // {
  //   name: "Amit Deshmukh",
  //   rating: 5,
  //   review:
  //     "Exceptional quality and service! The gift hampers were elegantly packed and delivered right on time. Perfect for corporate events and celebrations.",
  // },
];

function StarRating({ rating }) {
  return (
    <div className="flex justify-center gap-0.5 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-lg">
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isMobile }) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-lg p-8 md:p-12 flex flex-col items-center justify-center text-center border border-zinc-100 w-full h-full min-h-[300px]`}
    >
      <h3
        className={`font-bold text-zinc-900 mb-2 ${
          isMobile ? "text-xl" : "text-2xl"
        }`}
      >
        {testimonial.name}
      </h3>
      <StarRating rating={testimonial.rating} />
      <p className="text-sm md:text-sm text-zinc-600 italic leading-relaxed overflow-y-auto grow flex items-center mt-4">
        "{testimonial.review}"
      </p>
    </div>
  );
}

export default function Testimonials() {
  const desktopRef = useRef(null);

  const scrollDesktop = (direction) => {
    if (!desktopRef.current) return;
    const container = desktopRef.current;
    // Scroll by one card width + gap
    const card = container.querySelector("[data-card]");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 20; // 20px = gap-5
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 md:py-20 max-w-5xl mx-auto px-4 lg:px-0">
      <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 text-center mb-12">
        What Our Customers Say
      </h2>

      {/* Desktop View — arrows + smooth scroll */}
      <div className="hidden md:block relative">
        <div className="flex items-stretch gap-4">
          {/* Left Arrow */}
          <button
            onClick={() => scrollDesktop("prev")}
            className="shrink-0 w-10 h-10 rounded-full border border-zinc-300 bg-white shadow-sm flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer self-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-600" />
          </button>

          {/* Scrollable Cards Container */}
          <div
            ref={desktopRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory flex-1 hide-scrollbar items-stretch py-4"
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                data-card
                className="w-full min-w-full shrink-0 snap-center px-2"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollDesktop("next")}
            className="shrink-0 w-10 h-10 rounded-full border border-zinc-300 bg-white shadow-sm flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer self-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </div>

      {/* Mobile View — native horizontal scroll, no buttons */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar items-stretch">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="w-full min-w-full shrink-0 snap-center px-1"
            >
              <TestimonialCard testimonial={testimonial} isMobile />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
