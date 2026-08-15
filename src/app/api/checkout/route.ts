import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { items, deliveryMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          ...(item.image_url
            ? {
                images: [item.image_url],
              }
            : {}),
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.quantity) || 1,
    }));

    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
  mode: "payment",

  line_items: lineItems,

  metadata: {
    delivery_method: deliveryMethod || "Not specified",
  },

      billing_address_collection: "required",

      shipping_address_collection: {
        allowed_countries: ["FR"],
      },

      success_url: `${origin}/en/order-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/en/cart`,

      submit_type: "pay",

      customer_creation: "always",
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to create Stripe checkout session.",
      },
      { status: 500 }
    );
  }
}