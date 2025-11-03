// This is your new file: functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { HttpsError } = require("firebase-functions/v1/https/");

// Initialize Firebase Admin
admin.initializeApp();

// Load the Stripe library
const stripe = require("stripe")(functions.config().stripe.secret);

// This is your app's live URL.
// We'll send users here after they pay or cancel.
const YOUR_WEBSITE_URL = "https://www.incdrops.com"; // Your Vercel URL

/**
 * Creates a Stripe Checkout session.
 * This function is called by your React app when a user clicks "Buy Now".
 */
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // --- 1. Check if the user is logged in ---
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to purchase a plan.",
    );
  }

  const uid = context.auth.uid;
  const email = context.auth.token.email;
  const priceId = data.priceId; // The ID you copied from Stripe (e.g., 'price_1P...')

  try {
    // --- 2. Create the Checkout Session ---
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // Use 'subscription' for recurring plans
      line_items: [
        {
          price: priceId, // The ID of the plan they want to buy
          quantity: 1,
        },
      ],
      // --- 3. Set Redirect URLs (with the /# fix for your routing) ---
      success_url: `${YOUR_WEBSITE_URL}/#account?payment_success=true`, // Redirect to account page
      cancel_url: `${YOUR_WEBSITE_URL}/#pricing`, // Redirect to pricing page

      // --- 4. Link the session to the user ---
      customer_email: email, // Pre-fill the user's email
      metadata: {
        // This is THE most important part.
        // It tells our future webhook which Firebase user to give the subscription to.
        firebaseUID: uid,
      },
    });

    // --- 5. Send the session ID back to the app ---
    return {
      id: session.id,
    };
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while creating the checkout session.",
    );
  }
});