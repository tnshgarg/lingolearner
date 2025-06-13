import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

export async function POST() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userSubscription = await getUserSubscription();
    const returnUrl = absoluteUrl("/shop");

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: returnUrl,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.emailAddresses[0].emailAddress,
      billing_address_collection: "required",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "INR",
            product_data: {
              name: "LEAF Pro",
              description: "Unlimited Hearts",
            },
            unit_amount: 50000,
            recurring: {
              interval: "month",
            },
          },
        },
      ],
      metadata: {
        userId,
      },
      success_url: returnUrl,
      cancel_url: returnUrl,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    return NextResponse.json({ error: (error as any).message || "Internal error" }, { status: 500 });
  }
} 