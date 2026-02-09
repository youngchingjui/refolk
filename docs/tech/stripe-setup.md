# Stripe Payment Links Setup

**Technical Documentation**

## Overview

This document describes the technical implementation of Stripe payment integration using Payment Links.

We're using Stripe Payment Links for simplicity. No backend code required - just create links in the Stripe dashboard and add them to the website via environment variables.

## Step-by-Step Setup

### 1. Create Stripe Account (if needed)

Go to [stripe.com](https://stripe.com) and sign up or log in.

### 2. Create Products

Navigate to **Products** in the Stripe dashboard, then create:

#### Product 1: Twins - Starter

- **Name:** Twins - Starter
- **Description:** Access to digital customer twins with Slack and Email integrations
- **Pricing:**
  - Type: Recurring
  - Price: $50 USD
  - Billing period: Monthly
  - Currency: USD

#### Product 2: Twins - Team

- **Name:** Twins - Team
- **Description:** Full team access with custom twin creation and API access
- **Pricing:**
  - Type: Recurring
  - Price: $300 USD
  - Billing period: Monthly
  - Currency: USD

### 3. Create Payment Links

For each product, click **Create payment link**:

**Settings for both links:**

- **Collect customer information:** Email address (required)
- **Collect additional information:**
  - Company name (optional)
  - How did you hear about us? (optional)
- **After payment:**
  - Redirect to: `https://yourdomain.com/welcome` (we'll create this page)
  - OR use Stripe's default success page for now
- **Allow promotion codes:** Yes (useful for early customer discounts)

**Copy the payment link URLs.** They'll look like:

```
https://buy.stripe.com/xxxxxxx (Starter)
https://buy.stripe.com/yyyyyyy (Team)
```

### 4. Add Links to Environment Variables

Create a `.env.local` file in the project root:

```bash
# Stripe Payment Links
NEXT_PUBLIC_STRIPE_STARTER_LINK=https://buy.stripe.com/your-starter-link
NEXT_PUBLIC_STRIPE_TEAM_LINK=https://buy.stripe.com/your-team-link
```

### 5. Update Pricing Component

The pricing component has been updated to use these environment variables. Once you add your Stripe links to `.env.local`, the buttons will work.

### 6. Test in Test Mode

Before going live:

1. Use Stripe's **Test mode** (toggle in dashboard)
2. Create test payment links
3. Test the full purchase flow
4. Use Stripe's test card: `4242 4242 4242 4242`

### 7. Go Live

When ready:

1. Switch Stripe to **Live mode**
2. Create production payment links
3. Update `.env.local` with live links
4. Deploy to Vercel
5. Add the environment variables in Vercel dashboard (Settings → Environment Variables)

## Post-Purchase Flow (Current Plan)

**Email onboarding instructions manually** when someone subscribes:

1. You'll get a Stripe email notification when someone pays
2. Send them a welcome email with:
   - Thank you message
   - What to expect (we're in early access)
   - How to get started (manual onboarding for now)
   - Your contact info for questions

**Future:** Build automated onboarding with webhooks, account creation, etc.

## Stripe Webhooks (Future Enhancement)

For now, we're keeping it simple. Later, you can add webhooks to:

- Automatically create user accounts on purchase
- Send automated onboarding emails
- Handle subscription changes/cancellations
- Grant/revoke access based on payment status

## Useful Stripe Dashboard Links

- **Payment Links:** https://dashboard.stripe.com/payment-links
- **Products:** https://dashboard.stripe.com/products
- **Customers:** https://dashboard.stripe.com/customers
- **Billing:** https://dashboard.stripe.com/subscriptions

## Environment Variables Reference

```bash
# .env.local
NEXT_PUBLIC_STRIPE_STARTER_LINK=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_TEAM_LINK=https://buy.stripe.com/...
```

Add the same variables to Vercel:

- Project Settings → Environment Variables
- Add for Production, Preview, and Development

---

**Status:** Payment links need to be created in Stripe dashboard and added to environment variables.
