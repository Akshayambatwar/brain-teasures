import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand / About */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Brain Teasers Books
            </h3>
            <p className="text-sm leading-relaxed">
              Educational workbooks designed to improve critical thinking,
              creativity, and problem-solving skills in children.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>📧 Email: <a href="mailto:brainteasers4all@gmail.com" className="hover:text-white">brainteasers4all@gmail.com</a></li>
              {/* <li>📞 Phone: <a href="tel:+919999999999" className="hover:text-white">+91 99999 99999</a></li> */}
              <li>📍 India (PAN India Shipping)</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Follow Us
            </h3>
            <p className="text-sm mb-3">
              Parenting tips, worksheets & updates
            </p>

            <Link
              href="https://www.instagram.com/brainteasersforkids?igsh=MTM4bzhzZGwxZjMyaQ=="
              target="_blank"
              className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              📸 Instagram
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-zinc-700 mt-8 pt-4 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Brain Teasers Books. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
