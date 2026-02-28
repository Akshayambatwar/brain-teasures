import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order) {
  try {
    await resend.emails.send({
      from: "Brain Teasers <onboarding@resend.dev>",
      to: order.customer.email,
      subject: "Your Order Confirmation 🎉",
      html: `
        <h2>Thank you ${order.customer.name}!</h2>

        <p>Your order has been successfully placed.</p>

        <p><strong>Order ID:</strong> ${order.razorpayOrderId}</p>
        <p><strong>Total Paid:</strong> ₹${order.total}</p>

        <p>Your order will be delivered within 5–7 business days.</p>

        <p>If you have any questions, reply to this email.</p>

        <br/>
        <p>– Brain Teasers Team</p>
      `,
    });

  } catch (error) {
    console.error("Email send error:", error);
  }
}