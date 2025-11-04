// This is your new file: functions/index.js
// It uses the new "2nd Gen" syntax

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const stripe = require("stripe");

// Initialize Firebase Admin
admin.initializeApp();

// Define the Stripe secret key using the new method
const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

// --- THIS IS THE FIXED LINE ---
const YOUR_WEBSITE_URL = "https://www.incdrops.com"; // Your Vercel URL

/**
 * Creates a Stripe Checkout session (2nd Gen)
 */
exports.createCheckoutSession = onCall({
    secrets: [stripeSecretKey], // Make the secret available to this function
  }, async (request) => {
    
    // 1. Check if the user is logged in
    if (!request.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be logged in to purchase a plan.",
      );
    }

    // Load the secret key value
    const stripeClient = new stripe(stripeSecretKey.value());

    const uid = request.auth.uid;
    const email = request.auth.token.email;
    const priceId = request.data.priceId; // The ID from your React app

    try {
      // 2. Create the Checkout Session
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        // 3. Set Redirect URLs (with the /# fix for your routing)
        success_url: `${YOUR_WEBSITE_URL}/#account?payment_success=true`,
        cancel_url: `${YOUR_WEBSITE_URL}/#pricing`,

        // 4. Link the session to the user
        customer_email: email,
        metadata: {
          firebaseUID: uid, // This is still the most important part
        },
      });

      // 5. Send the session ID back to the app
      return {
        id: session.id,
      };
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      throw new HttpsError(
        "internal",
        "An error occurred while creating the checkout session.",
      );
    }
  });