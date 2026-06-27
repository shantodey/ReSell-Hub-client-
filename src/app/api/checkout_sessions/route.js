import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { authUserData } from '@/lib/api/forGettingUserData'


export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const { amount } = await request.json()
    const user = await authUserData()
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized! Please log in." }, { status: 401 })
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email, 
      line_items: [
        {
          price_data: {
            currency: 'bdt',
            product_data: {
              name: 'Total Order Payment',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,      
        userName: user.name,  
        userEmail: user.email
      },
      mode: 'payment',
      success_url: `${origin}/cheackOut/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}