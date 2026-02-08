# 🚂 Railway Deployment Guide

## Quick Deploy to Railway

Your app is now ready for Railway deployment with a single Dockerfile!

### What Changed?
- ✅ Single Dockerfile builds both frontend and backend
- ✅ Backend serves the React frontend static files
- ✅ Both run on the same port (5000)
- ✅ Perfect for Railway's architecture

### Step 1: Push to GitHub

```powershell
git add .
git commit -m "Add Railway deployment with single Dockerfile"
git push origin main
```

### Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app/)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository: `naksh-react-node-assignment`
5. Railway auto-detects the Dockerfile ✅

### Step 3: Add Environment Variables

In Railway dashboard, add:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `PORT`: 5000 (Railway sets this automatically, optional)

### Step 4: Deploy!

Click "Deploy" and wait ~2-3 minutes.

Railway will provide a URL like:
```
https://naksh-react-node-assignment-production.up.railway.app
```

### Access Your App

**Single URL for everything:**
- Frontend: `https://your-app.railway.app/`
- Products API: `https://your-app.railway.app/products`
- Cart API: `https://your-app.railway.app/cart`
- Health Check: `https://your-app.railway.app/health`

---

## Local Testing

Test the production build locally:

```powershell
# Build
docker build -t naksh-jewels .

# Run
docker run -d -p 5000:5000 --env-file backend/.env naksh-jewels

# Test
# Frontend: http://localhost:5000
# API: http://localhost:5000/products
```

---

## MongoDB Setup

1. Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create database user
3. Whitelist Railway IPs or use `0.0.0.0/0`
4. Copy connection string
5. Add to Railway environment variables

---

## Troubleshooting

**Build fails:**
- Check Dockerfile syntax
- Ensure package.json files exist in frontend/ and backend/

**Can't connect to MongoDB:**
- Verify MONGO_URI in Railway dashboard
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

**Frontend not loading:**
- Check that `npm run build` succeeded
- Verify static files are in `/app/public`
- Check server logs: `docker logs <container_name>`

---

## Files Created

- `Dockerfile` - Single multi-stage build
- `railway.json` - Railway configuration
- `.dockerignore` - Files to exclude from build
- `backend/index.js` - Updated to serve frontend

---

## Cost

Railway Free Trial: $5 credits (runs ~1 month)
MongoDB Atlas: Free M0 tier

**Total: $0 for demo/portfolio**

---

**You're ready to deploy!** 🚀
