import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("SUPABASE_SERVICE_ROLE_KEY is not set");
        return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!WEBHOOK_SECRET) {
            console.error("RAZORPAY_WEBHOOK_SECRET is not set");
            return NextResponse.json({ error: "Configuration error" }, { status: 500 });
        }

        if (!signature) {
            return NextResponse.json({ error: "Missing signature" }, { status: 400 });
        }

        // Verify Signature
        const expectedSignature = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        // Process Event
        const event = JSON.parse(body);

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;
            const amount = payment.amount / 100; // Razorpay sends in paise
            const metadata = payment.notes; // We should pass user_id in notes

            if (metadata?.user_id) {
                // Insert Transaction
                const { error } = await supabase.from("transactions").insert({
                    user_id: metadata.user_id,
                    type: "deposit",
                    amount: amount,
                    status: "completed",
                    description: `Razorpay Payment ${payment.id} (Order ${orderId})`
                });

                if (error) {
                    console.error("Failed to record transaction:", error);
                    return NextResponse.json({ error: "Database error" }, { status: 500 });
                }
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Webhook processing failed:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
