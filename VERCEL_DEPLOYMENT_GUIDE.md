# Vercel Deployment Guide with Inngest

## Prerequisites
- GitHub repository created and pushed
- Vercel account (vercel.com)
- Inngest account (inngest.com)

## Step 1: Prepare Your GitHub Repository

```bash
git add .
git commit -m "Prepare for Vercel deployment with Inngest"
git push origin main
```

## Step 2: Deploy to Vercel

1. Go to **vercel.com** and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository (QuickCart)
4. Configure the project:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: .next (default)

## Step 3: Add Environment Variables to Vercel

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

### Public Variables
```
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_anVzdC1jb2xsaWUtNTguY2xlcmsuYWNjb3VudHMuZGV2JA
```

### Private Variables
```
CLERK_SECRET_KEY=sk_test_xOxvsdMY4Yz0ue6RleiGYrbKXnOx7rVJrFx663wE6M
MONGODB_URI=mongodb+srv://movinraj444:movinraj060805@cluster0.gwk8sxl.mongodb.net
INNGEST_SIGNING_KEY=signkey-prod-ee3cc8a46b72ec446b691a0d2586f733276457669cfae848a38c9210b4de0aa4
INNGEST_EVENT_KEY=bPq2MrhWlZzoBEHVl_74_LYIzpopwtQCe1B35LfuyZdN5EjyOfauDbdmnoufGlU8fLO9Cen25ZGv3yZGM85t6w
NODE_ENV=production
```

## Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for deployment to complete
3. Your app will be available at: `https://your-project-name.vercel.app`

## Step 5: Connect Inngest to Your Vercel Deployment

### Via Inngest Dashboard:

1. Go to **inngest.com** → Login to your dashboard
2. Go to **Settings** → **Integrations** → **Vercel**
3. Click **Connect Vercel**
4. Authorize and select your QuickCart project
5. Inngest will automatically detect your Inngest API route at:
   ```
   https://your-project-name.vercel.app/api/inngest
   ```

### Alternative: Manual Webhook Setup

1. In Inngest Dashboard, go to **Settings** → **Webhooks**
2. Add your Inngest API endpoint:
   ```
   https://your-project-name.vercel.app/api/inngest
   ```

## Step 6: Test Inngest Sync

1. Create a test user in Clerk to trigger:
   - `clerk.user.created` event
   
2. In Inngest Dashboard, go to **Logs** to verify:
   - Events are being received
   - Functions are executing
   - Database sync is working

3. Check MongoDB to confirm user data is synced:
   ```
   MongoDB Atlas → Clusters → Collections → users
   ```

## Step 7: Monitor in Production

**Inngest Dashboard:**
- Monitor function execution status
- View logs and error traces
- Track event processing

**Vercel Dashboard:**
- Monitor function runtime
- Check deployment logs
- Monitor server errors

## Troubleshooting

### Issue: "Inngest endpoint not found"
- Verify environment variables are set correctly
- Check that `/api/inngest` route exists in [app/api/inngest.ts](../app/api/inngest.ts)
- Ensure deployment is complete by visiting: `https://your-project-name.vercel.app/api/inngest`

### Issue: "Cannot connect to MongoDB"
- Verify `MONGODB_URI` is correct
- Check MongoDB IP whitelist includes Vercel IP ranges (0.0.0.0/0 for all)
- Test connection in MongoDB Atlas

### Issue: "Clerk events not syncing"
- Verify Clerk webhook is pointing to: `https://your-project-name.vercel.app/api/inngest`
- In Clerk Dashboard → Webhooks → verify trigger events are enabled
- Check Inngest logs for webhook delivery status

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication | pk_test_... |
| `CLERK_SECRET_KEY` | Clerk backend authentication | sk_test_... |
| `MONGODB_URI` | Database connection | mongodb+srv://... |
| `INNGEST_SIGNING_KEY` | Inngest webhook signing | signkey-prod-... |
| `INNGEST_EVENT_KEY` | Inngest API authentication | bPq2... |
| `NEXT_PUBLIC_CURRENCY` | Currency display | $ |
| `NODE_ENV` | Environment | production |

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure environment variables
3. ✅ Connect Inngest integration
4. ✅ Test Clerk → Inngest → MongoDB sync
5. Monitor logs and events

Your website is now live with Inngest event syncing! 🚀
