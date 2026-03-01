export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="mb-4">
        We aim to ensure customer satisfaction. If you receive a damaged or incorrect product,
        please contact us within 7 days of delivery.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Eligibility</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Product must be unused and in original condition</li>
        <li>Request must be made within 7 days of delivery</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Refund Process</h2>
      <p>
        Once approved, refunds will be processed within 5-7 business days to the original
        payment method.
      </p>

      <p className="mt-6">
        For refund requests, email us at <strong>brainteasers4all@gmail.com</strong>.
      </p>
    </div>
  );
}