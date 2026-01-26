# 🚀 Quick Deployment Guide

This is a quick reference guide for deploying your Pet Store application. For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## ⚡ Quick Start (5 Minutes)

### Option 1: Separate Frontend & Backend (Recommended)

#### Backend (Render/Railway):
1. Go to [render.com](https://render.com) or [railway.app](https://railway.app)
2. Create new Web Service
3. Connect GitHub repo
4. Set **Root Directory**: `back-end`
5. Set **Start Command**: `node index.js`
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_random_secret_key
   PAYPAL_CLIENT_ID=your_paypal_id
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
7. Deploy and copy backend URL

#### Frontend (Vercel):
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set **Root Directory**: `front-end`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
7. Deploy

### Option 2: Full Stack (Single Platform)

#### Railway (Full Stack):
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add service → Select repo
4. Set **Root Directory**: `back-end`
5. Add Environment Variables (same as above)
6. Add build step:
   - **Build Command**: `cd ../front-end && npm install && npm run build`
7. Deploy

## 📝 Environment Variables Checklist

### Backend:
- ✅ `NODE_ENV=production`
- ✅ `PORT=10000` (or platform default)
- ✅ `MONGO_URI=mongodb+srv://...`
- ✅ `JWT_SECRET=strong_random_string`
- ✅ `PAYPAL_CLIENT_ID=your_paypal_id`
- ✅ `FRONTEND_URL=https://your-frontend-url.com` (for CORS)

### Frontend:
- ✅ `VITE_API_URL=https://your-backend-url.com`

## 🗄️ MongoDB Atlas Setup (2 Minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Database Access → Create user
4. Network Access → Add IP `0.0.0.0/0`
5. Connect → Copy connection string
6. Replace `<password>` with your password

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend can connect to backend
- [ ] Test user registration
- [ ] Test login
- [ ] Test product browsing
- [ ] Test cart and checkout
- [ ] Test admin dashboard (if applicable)

## 🐛 Common Issues

**CORS Error**: Add `FRONTEND_URL` to backend env vars

**API Not Found**: Check `VITE_API_URL` in frontend env vars

**Database Connection Failed**: Verify MongoDB Atlas network access

**Build Fails**: Check Node.js version (use 18+)

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
