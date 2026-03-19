"use client";

export default function WhatsAppButton() {
  const phoneNumber = "919119532127";
  const message = encodeURIComponent(
    "Hi! I'm interested in Brain Teasers books. Can you help me?"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8 fill-white"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.923 15.923 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.828-6.81-8.066-7.124-.228-.314-1.924-2.562-1.924-4.888s1.218-3.468 1.65-3.94c.432-.472.944-.59 1.258-.59.314 0 .63.002.904.016.29.014.68-.11 1.064.812.39.944 1.336 3.27 1.454 3.506.118.236.196.512.04.826-.158.314-.236.51-.472.786-.236.276-.496.616-.71.826-.236.236-.482.492-.208.964.276.472 1.224 2.02 2.63 3.272 1.808 1.61 3.332 2.11 3.804 2.346.472.236.748.196 1.024-.118.276-.314 1.18-1.374 1.494-1.846.314-.472.63-.39 1.062-.236.432.158 2.756 1.3 3.228 1.536.472.236.786.354.904.55.118.196.118 1.14-.272 2.24z" />
      </svg>
    </a>
  );
}
