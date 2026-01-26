# 🚀 Deployment Guide - Pet Store Full Stack Application

This guide will help you deploy your Pet Store application to production. We'll cover deployment options for both frontend and backend.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Options](#deployment-options)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

Before deploying, ensure you have:

1. **MongoDB Database**: Either MongoDB Atlas (cloud) or a self-hosted MongoDB instance
2. **PayPal Account**: For payment processing (optional, but recommended)
3. **GitHub/GitLab Account**: For version control and CI/CD
4. **Accounts on deployment platforms**:
   - Vercel/Netlify (for frontend)
   - Render/Railway/Heroku (for backend)

## 🎯 Deployment Options

### Recommended Setup:
- **Frontend**: Vercel or Netlify (free tier available)
- **Backend**: Render or Railway (free tier available)
- **Database**: MongoDB Atlas (free tier available)

### Alternative Setup:
- **Full Stack**: Railway or Render (can host both frontend and backend)

---

## 🔧 Backend Deployment

### Option 1: Render (Recommended)

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure the Service**
   - **Name**: `pet-store-backend`
   - **Root Directory**: `back-end`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_random_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://pet-store-backend.onrender.com`)

### Option 2: Railway

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app) and sign up

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure the Service**
   - Railway will auto-detect Node.js
   - Set **Root Directory** to `back-end`
   - Set **Start Command** to `node index.js`

4. **Set Environment Variables**
   - Go to Variables tab
   - Add all required environment variables (same as Render)

5. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL from the service settings

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create pet-store-backend
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

4. **Deploy**
   ```bash
   cd back-end
   git subtree push --prefix back-end heroku main
   ```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com) and sign up

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure the Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `front-end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
   (Replace with your actual backend URL from Render/Railway)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com) and sign up

2. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - **Base directory**: `front-end`
   - **Build command**: `npm run build`
   - **Publish directory**: `front-end/dist`

4. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` with your backend URL

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `https://your-app.netlify.app`

### Option 3: Deploy with Backend (Full Stack)

If deploying both on Railway or Render:

1. **Build the Frontend**
   ```bash
   cd front-end
   npm run build
   ```

2. **Update Backend to Serve Frontend**
   - The backend is already configured to serve static files in production
   - Ensure `NODE_ENV=production` is set
   - The backend will serve the frontend from `front-end/dist`

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `back-end` directory:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pet-store?retryWrites=true&w=majority

# Security
JWT_SECRET=your_very_strong_random_secret_key_minimum_32_characters

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Frontend (.env)

Create a `.env` file in the `front-end` directory:

```env
# API URL (leave empty for development, set for production)
VITE_API_URL=https://your-backend-url.com
```

**Important**: 
- Vite requires the `VITE_` prefix for environment variables
- Never commit `.env` files to Git
- Use `.env.example` as a template

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create an Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a Cluster**
   - Choose a free tier (M0)
   - Select a region close to your users
   - Create cluster

3. **Configure Database Access**
   - Go to "Database Access"
   - Create a database user
   - Set a strong password

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allow all IPs for production)
   - Or add specific IPs for better security

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Use this as your `MONGO_URI`

---

## 📝 Step-by-Step Deployment Checklist

### Backend Deployment:

- [ ] Create MongoDB Atlas cluster
- [ ] Configure database user and network access
- [ ] Get MongoDB connection string
- [ ] Create Render/Railway account
- [ ] Create new web service
- [ ] Set root directory to `back-end`
- [ ] Configure build and start commands
- [ ] Add all environment variables
- [ ] Deploy and test backend URL
- [ ] Verify API endpoints are working

### Frontend Deployment:

- [ ] Build frontend locally: `cd front-end && npm run build`
- [ ] Test build locally: `npm run preview`
- [ ] Create Vercel/Netlify account
- [ ] Import GitHub repository
- [ ] Configure build settings
- [ ] Set `VITE_API_URL` environment variable
- [ ] Deploy frontend
- [ ] Test all features (login, products, cart, checkout)
- [ ] Update CORS settings if needed

### Post-Deployment:

- [ ] Test user registration
- [ ] Test user login
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test admin dashboard
- [ ] Test file uploads
- [ ] Configure custom domain (optional)
- [ ] Set up SSL/HTTPS (usually automatic)
- [ ] Monitor error logs

---

## 🔒 Security Checklist

- [ ] Use strong JWT_SECRET (minimum 32 characters)
- [ ] Use MongoDB Atlas with proper authentication
- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Set proper CORS origins
- [ ] Never commit `.env` files
- [ ] Use environment variables for all secrets
- [ ] Regularly update dependencies
- [ ] Set up error monitoring (Sentry, etc.)

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem**: Backend won't start
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check logs for specific error messages
- Ensure PORT is set correctly

**Problem**: Database connection fails
- Verify MongoDB Atlas network access allows your IP
- Check username and password in connection string
- Ensure cluster is running

**Problem**: CORS errors
- Add frontend URL to CORS whitelist in backend
- Check if backend URL is correct in frontend

### Frontend Issues:

**Problem**: API calls fail
- Verify `VITE_API_URL` is set correctly
- Check backend is running and accessible
- Verify CORS is configured on backend
- Check browser console for specific errors

**Problem**: Build fails
- Check Node.js version compatibility
- Clear `node_modules` and reinstall
- Check for missing dependencies
- Review build logs for specific errors

**Problem**: Images not loading
- Verify uploads directory is accessible
- Check file paths in production
- Ensure static file serving is configured

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 🎉 Success!

Once deployed, your Pet Store application will be live and accessible to users worldwide!

**Remember to:**
- Monitor your application regularly
- Set up backups for your database
- Keep dependencies updated
- Monitor error logs
- Set up analytics (optional)

---

**Need Help?** Open an issue in the repository or check the platform-specific documentation.
