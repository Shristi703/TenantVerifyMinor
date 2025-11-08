# Deployment Guide - Vercel

This guide will help you deploy the TenantVerify application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy (Recommended)

### Method 1: Vercel Dashboard (Easiest)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables** (Optional)
   - In project settings, go to "Environment Variables"
   - Add if needed:
     - `VITE_API_BASE_URL` - Your backend API URL
     - `VITE_USE_MOCK_DATA` - Set to `true` for mock data

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # First deployment (preview)
   vercel
   
   # Production deployment
   vercel --prod
   ```

## Build Configuration

The project is already configured with:
- **Build Command**:** `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Node Version**: 18.x (auto-detected)

## Environment Variables

### For Development (Mock Data)
```
VITE_USE_MOCK_DATA=true
```

### For Production (With Backend)
```
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_USE_MOCK_DATA=false
```

## Post-Deployment

1. **Test Your Deployment**
   - Visit your Vercel URL
   - Test all routes and features
   - Verify API connections (if applicable)

2. **Custom Domain** (Optional)
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Monitor Deployments**
   - Check Vercel dashboard for build logs
   - Set up deployment notifications

## Troubleshooting

### Build Fails

1. Check Node version (should be 18.x or higher)
2. Verify all dependencies are in `package.json`
3. Check build logs in Vercel dashboard

### Routes Not Working

- The `vercel.json` includes SPA rewrites
- All routes should redirect to `index.html`
- If issues persist, check the rewrites configuration

### API Not Connecting

- Verify `VITE_API_BASE_URL` is set correctly
- Check CORS settings on your backend
- Use mock data for testing: `VITE_USE_MOCK_DATA=true`

## Continuous Deployment

Vercel automatically deploys on every push to your main branch:
- Push to `main` → Production deployment
- Push to other branches → Preview deployment

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)

