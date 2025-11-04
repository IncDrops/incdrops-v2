// This is your new file: functions/index.js
// It contains BOTH your checkout and webhook functions

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https"); // We need this for the webhook
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const stripe = require("stripe");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore(); // Get a reference to the database

// Define our two secrets
const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

const YOUR_WEBSITE_URL = "https://www.incdrops.com";

// ------------------------------------------------------------------
// FUNCTION 1: CREATE CHECKOUT (This is your existing code)
// ------------------------------------------------------------------
exports.createCheckoutSession = onCall({
    secrets: [stripeSecretKey], 
  }, async (request) => {
    
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "You must be logged in.");
    }

    const stripeClient = new stripe(stripeSecretKey.value());
    const uid = request.auth.uid;
    const email = request.auth.token.email;
    const priceId = request.data.priceId; 

    try {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${YOUR_WEBSITE_URL}/#account?payment_success=true`,
        cancel_url: `${YOUR_WEBSITE_URL}/#pricing`,
        customer_email: email,
        metadata: {
          firebaseUID: uid, // This links the payment to the user
        },
      });

      return { url: session.url };
      
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      throw new HttpsError("internal", "Error creating checkout session.");
    }
  });

// ------------------------------------------------------------------
// FUNCTION 2: STRIPE WEBHOOK (This is the new function)
// ------------------------------------------------------------------
exports.stripeWebhook = onRequest({
    secrets: [stripeWebhookSecret, stripeSecretKey], // Give it access to the secrets
  }, async (request, response) => {

    const stripeClient = new stripe(stripeSecretKey.value());
    const sig = request.headers["stripe-signature"];
    const secret = stripeWebhookSecret.value();

    let event;

    try {
      // 1. Verify the event came from Stripe
      event = stripeClient.webhooks.constructEvent(request.rawBody, sig, secret);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // 2. Handle the 'checkout.session.completed' event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // 3. Get the Firebase UID from the metadata we set
      const firebaseUID = session.metadata.firebaseUID;
      if (!firebaseUID) {
        console.error("Error: Missing firebaseUID in Stripe metadata.");
        response.status(400).send("Error: Missing user ID in metadata.");
        return;
      }

      // 4. Get the Price ID and determine the new tier
      const priceId = session.line_items.data[0].price.id;
      let newTier = 'free'; // Default
      
      // Match the Price IDs you gave me
      if (priceId === 'price_1SPUKaHK4G9ZDA0FqdzT1Hae') newTier = 'basic';
      if (priceId === 'price_1SPUM6HK4G9ZDA0FWqZJOLVH') newTier = 'pro';
      if (priceId === 'price_1SPUNGHK4G9ZDA0FrNIo8Dzt') newTier = 'business';

      try {
        // 5. Update the user's document in Firestore
        const userRef = db.collection('users').doc(firebaseUID);
        await userRef.update({
          tier: newTier,
          stripeCustomerId: session.customer, // Save the Stripe customer ID
        });
        console.log(`Successfully updated tier to '${newTier}' for user ${firebaseUID}`);
      } catch (err) {
        console.error("Error updating user in Firestore:", err);
        response.status(500).send("Error updating user data.");
        return;
      }
    }

    // 6. Acknowledge the event
    response.status(200).send();
  });