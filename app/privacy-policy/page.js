export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Brain Teasers values your privacy. We collect personal information such as name, email,
        phone number, and shipping address solely for order processing and customer support.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Name, email address, phone number</li>
        <li>Shipping address</li>
        <li>Payment information (processed securely via Razorpay)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p>
        We use secure third-party payment gateways and industry-standard security measures
        to protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        If you have any questions regarding this policy, contact us at
        <strong> brainteasers4all@gmail.com</strong>.
      </p>
    </div>
  );
}