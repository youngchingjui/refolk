# Refolk Monetization Setup - Complete ✅

**Date:** 2026-02-09
**Status:** TEST MODE READY - Needs live mode setup before production launch

## What's Been Completed

### 1. ✅ Pricing Model Defined

All documentation updated to reflect final pricing:

- **Starter:** $50/month - 3 curated personas
- **Team:** $300/month - 30 curated personas
- **Enterprise:** Custom pricing - Unlimited personas

Updated files:

- `docs/user/reqs.md`
- `docs/marketing/pricing-strategy.md`
- `components/pricing.tsx`

### 2. ✅ Stripe Products Created (Test Mode)

Created via Stripe CLI:

**Starter Product:**

- Product ID: `prod_Twe1k8umIIvGMD`
- Price ID: `price_1SykjtJJUWoGcvyBJYLgYFgG`
- Amount: $50/month (5000 cents)

**Team Product:**

- Product ID: `prod_Twe20xdy02kZcn`
- Price ID: `price_1SykkpJJUWoGcvyBARHlM9xZ`
- Amount: $300/month (30000 cents)

### 3. ✅ Stripe Payment Links Created (Test Mode)

**Starter Payment Link:**

```
https://buy.stripe.com/test_4gMcN6geR42qgmsbr0asg00
```

**Team Payment Link:**

```
https://buy.stripe.com/test_6oUcN6d2F42qgms66Gasg01
```

Features configured:

- ✅ Allow promotion codes
- ✅ Custom confirmation message
- ✅ Automatic email collection

### 4. ✅ Environment Variables Configured

Created `.env.local` with test payment links:

```bash
NEXT_PUBLIC_STRIPE_STARTER_LINK=https://buy.stripe.com/test_4gMcN6geR42qgmsbr0asg00
NEXT_PUBLIC_STRIPE_TEAM_LINK=https://buy.stripe.com/test_6oUcN6d2F42qgms66Gasg01
```

### 5. ✅ Local Testing Complete

- Dev server running on port 3000
- Payment links verified in page source
- Buttons functional on pricing section

## Next Steps (Before Production Launch)

### 1. Add Environment Variables to Vercel

**Manual method (Recommended):**

1. Go to https://vercel.com/youngchingjuis-projects/refolk/settings/environment-variables
2. Add these two variables for **all environments** (Production, Preview, Development):

```
NEXT_PUBLIC_STRIPE_STARTER_LINK = https://buy.stripe.com/test_4gMcN6geR42qgmsbr0asg00
NEXT_PUBLIC_STRIPE_TEAM_LINK = https://buy.stripe.com/test_6oUcN6d2F42qgms66Gasg01
```

3. Trigger a new deployment (push to main or click "Redeploy")

**CLI method (if preferred):**

```bash
# For each variable, for each environment:
echo "https://buy.stripe.com/test_4gMcN6geR42qgmsbr0asg00" | vercel env add NEXT_PUBLIC_STRIPE_STARTER_LINK production
echo "https://buy.stripe.com/test_4gMcN6geR42qgmsbr0asg00" | vercel env add NEXT_PUBLIC_STRIPE_STARTER_LINK preview
echo "https://buy.stripe.com/test_4gMcN6geR42qgmsbr0asg00" | vercel env add NEXT_PUBLIC_STRIPE_STARTER_LINK development

echo "https://buy.stripe.com/test_6oUcN6d2F42qgms66Gasg01" | vercel env add NEXT_PUBLIC_STRIPE_TEAM_LINK production
echo "https://buy.stripe.com/test_6oUcN6d2F42qgms66Gasg01" | vercel env add NEXT_PUBLIC_STRIPE_TEAM_LINK preview
echo "https://buy.stripe.com/test_6oUcN6d2F42qgms66Gasg01" | vercel env add NEXT_PUBLIC_STRIPE_TEAM_LINK development
```

### 2. Test the Purchase Flow

**Test Mode Testing:**

1. Visit your deployed site
2. Click "Start getting feedback" or "Talk to the roster" buttons
3. Use Stripe test card: `4242 4242 4242 4242`
4. Use any future expiry date and any CVC
5. Complete the purchase
6. Verify confirmation message appears
7. Check Stripe dashboard for the test subscription

**Dashboard:** https://dashboard.stripe.com/test/subscriptions

### 3. Create Live Mode Products & Links

When ready to accept real payments:

```bash
# Switch to live mode
stripe products create \
  --name="Refolk - Starter" \
  --description="Access to 3 digital customer personas with Slack and Email integrations" \
  --live

# Get the product ID from output, then create price
stripe prices create \
  --product="prod_XXXXX" \
  --unit-amount=5000 \
  --currency=usd \
  --recurring.interval=month \
  --nickname="Starter Monthly" \
  --live

# Create payment link
stripe payment_links create \
  -d "line_items[0][price]=price_XXXXX" \
  -d "line_items[0][quantity]=1" \
  --after-completion.type=hosted_confirmation \
  --after-completion.hosted-confirmation.custom-message="Thank you for subscribing to Refolk! We'll be in touch shortly with onboarding instructions." \
  --allow-promotion-codes=true \
  --live

# Repeat for Team product...
```

Then update `.env.local` and Vercel environment variables with the live links.

### 4. Set Up Stripe Webhooks (Future)

For automated onboarding, you'll need:

1. Create webhook endpoint in your app
2. Listen for these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
3. Automate account creation and access provisioning

See: https://docs.stripe.com/webhooks

### 5. Post-Purchase Flow (Current: Manual)

Right now, when someone subscribes:

1. You'll get email notification from Stripe
2. Manually send welcome email with:
   - Thank you message
   - Onboarding instructions
   - Contact information

**Future:** Automate this with webhooks + email service.

## Testing Checklist

- [x] Products created in Stripe test mode
- [x] Payment links created and configured
- [x] Environment variables set locally
- [x] Links verified in local dev server
- [ ] Environment variables added to Vercel
- [ ] Test purchase flow on deployed site
- [ ] Verify Stripe dashboard shows test subscription
- [ ] Test promotion codes work
- [ ] Create live mode products (when ready)
- [ ] Switch to live payment links (when ready)

## Files Changed

- ✅ `docs/user/reqs.md` - Updated to 30 personas
- ✅ `docs/marketing/pricing-strategy.md` - Updated to 30 personas
- ✅ `.env.local` - Created with test payment links
- ✅ `.env.local.example` - Already existed
- ✅ `components/pricing.tsx` - Already configured to use env vars

## Stripe CLI Commands Reference

```bash
# View products
stripe products list

# View prices
stripe prices list

# View payment links
stripe payment_links list

# View test subscriptions
stripe subscriptions list

# Listen to webhooks locally (for development)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Dashboard Links

- **Test Dashboard:** https://dashboard.stripe.com/test/dashboard
- **Live Dashboard:** https://dashboard.stripe.com/dashboard
- **Products:** https://dashboard.stripe.com/test/products
- **Payment Links:** https://dashboard.stripe.com/test/payment-links
- **Subscriptions:** https://dashboard.stripe.com/test/subscriptions
- **Customers:** https://dashboard.stripe.com/test/customers

---

**Task #28 Status: COMPLETE** ✅

Pricing model defined, Stripe products created, payment links working locally.
Next: Add env vars to Vercel and test deployed purchase flow.
