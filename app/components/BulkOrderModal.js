"use client";

export default function BulkOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl animate-scaleIn">

        <h2 className="text-2xl font-bold text-red-600">
          Bulk Order Notice
        </h2>

        <p className="mt-4 text-zinc-600">
          Maximum 5 copies allowed per order.
        </p>

        <p className="mt-2 text-zinc-600">
          For bulk purchases, please contact us directly.
        </p>

        <div className="mt-6 text-zinc-800 font-medium space-y-1">
          <p>📞 +91 9876543210</p>
          <p>📧 support@brainteasers.com</p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
