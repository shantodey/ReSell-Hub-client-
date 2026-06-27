import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }
  if (status === 'complete') {
    try {
      await fetch(`${process.env.SERVER_URL}/app/orders/update-status?email=${customerEmail}`, {
        method: 'PATCH'
      });
      console.log("Database updated successfully from Server Component");
    } catch (err) {
      console.error("Failed to update database from server:", err);
    }

    return (
      <section className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <meta httpEquiv="refresh" content="3;url=/dashboard/buyer/my-orders" />
        <div className="max-w-md w-full bg-base-100 rounded-2xl shadow-xl p-8 text-center border border-base-300">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center text-3xl font-bold">
              ✓
            </div>
          </div>

          <h2 className="text-2xl font-bold text-base-content mb-2">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            We appreciate your business! A confirmation email will be sent to{' '}
            <span className="font-semibold text-base-content">{customerEmail}</span>.
          </p>

          <div className="border-t border-dashed border-base-300 pt-4 mb-4">
            <p className="text-xs text-gray-500">
              If you have any questions, please email{' '}
              <a href="mailto:orders@example.com" className="link link-primary font-medium"> orders@example.com</a>
            </p>
          </div>
          <p className="mt-4 text-xs text-gray-400 bg-base-200 px-4 py-2 rounded-full inline-block">
            Redirecting to your orders dashboard in 3 seconds...
          </p>
        </div>
      </section>
    )
  }
}