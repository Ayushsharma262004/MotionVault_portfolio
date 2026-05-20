# Deployment Guide

## Architecture
- **Frontend**: React app → Vercel
- **Backend**: FastAPI → Railway/Render/Fly.io (separate)

## Backend Deployment (Choose one)

### Option A: Railway
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Init project: `railway init`
4. Add env vars in Railway dashboard:
   - `MONGO_URL=mongodb+srv://dmatter180_db_user:YOUR_NEW_PASSWORD@cluster0.3iveetp.mongodb.net/`
   - `DB_NAME=empire_ai`
   - `CORS_ORIGINS=https://your-vercel-app.vercel.app`
   - `NOTIFICATION_EMAIL=admin@example.com`
5. Deploy: `railway up` (from backend folder)
6. Get URL from Railway dashboard

### Option B: Render
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
7. Add environment variables (same as Railway)
8. Deploy

### Option C: Fly.io
1. Install: `powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"`
2. Login: `fly auth login`
3. From backend folder: `fly launch`
4. Set secrets:
   ```
   fly secrets set MONGO_URL="mongodb+srv://dmatter180_db_user:YOUR_NEW_PASSWORD@cluster0.3iveetp.mongodb.net/"
   fly secrets set DB_NAME="empire_ai"
   fly secrets set CORS_ORIGINS="https://your-vercel-app.vercel.app"
   fly secrets set NOTIFICATION_EMAIL="admin@example.com"
   ```
5. Deploy: `fly deploy`

## Frontend Deployment (Vercel)

### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`

### Deploy Steps
1. Update `frontend/.env.production` with backend URL:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

2. From project root:
   ```powershell
   vercel
   ```

3. Follow prompts:
   - Set up and deploy? **Y**
   - Scope: Select your account
   - Link to existing project? **N**
   - Project name: `motionvault-portfolio`
   - Directory: `./` (root)
   - Override settings? **N**

4. Add environment variable in Vercel dashboard:
   - Go to project settings → Environment Variables
   - Add: `REACT_APP_BACKEND_URL` = `https://your-backend-url.com`

5. Redeploy: `vercel --prod`

### Update Backend CORS
After frontend deployed, update backend `CORS_ORIGINS` env var with Vercel URL:
```
CORS_ORIGINS=https://your-app.vercel.app,http://localhost:3000
```

## Quick Deploy Commands

```powershell
# Backend (Railway example)
cd backend
railway up

# Frontend
cd ..
vercel --prod
```

## Verify Deployment
- Frontend: https://your-app.vercel.app
- Backend: https://your-backend-url.com/api
- Test: Open frontend, submit contact form

## Troubleshooting

### CORS errors
- Check backend `CORS_ORIGINS` includes frontend URL
- Redeploy backend after changing env vars

### API calls fail
- Verify `REACT_APP_BACKEND_URL` in Vercel env vars
- Check backend is running: visit `https://your-backend-url.com/api`

### Build fails
- Check Node version (need 16+)
- Clear cache: `vercel --force`
