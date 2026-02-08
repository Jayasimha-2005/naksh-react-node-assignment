# 🚀 Quick Deployment Checklist

## Pre-Deployment

- [ ] Remove sensitive data from `.env` files
- [ ] Test application locally
  - [ ] Backend: `cd backend && npm start`
  - [ ] Frontend: `cd frontend && npm start`
- [ ] Verify all features work:
  - [ ] Product listing
  - [ ] Add to cart
  - [ ] Cart operations (add/remove/update)
  - [ ] Seller mode (add/edit/delete products)
  - [ ] Search functionality

## MongoDB Setup

- [ ] Create MongoDB Atlas account
- [ ] Create a new cluster (M0 Free Tier)
- [ ] Create database user
- [ ] Whitelist IP addresses:
  - For testing: `0.0.0.0/0`
  - For production: Specific deployment platform IPs
- [ ] Get connection string
- [ ] Test connection with MongoDB Compass (optional)

## Backend Deployment (Choose One)

### Option A: Render.com (Recommended - Free)
- [ ] Sign up at render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory: `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variable: `MONGO_URI`
- [ ] Add environment variable: `PORT=5000`
- [ ] Deploy and copy backend URL

### Option B: Railway.app
- [ ] Sign up at railway.app
- [ ] New Project → Deploy from GitHub
- [ ] Select repository
- [ ] Set root directory: `backend`
- [ ] Add environment variables
- [ ] Deploy and copy backend URL

### Option C: Heroku
- [ ] Install Heroku CLI: `npm install -g heroku`
- [ ] Login: `heroku login`
- [ ] Create app: `heroku create naksh-jewels-backend`
- [ ] Set buildpack: `heroku buildpacks:set heroku/nodejs`
- [ ] Set config vars: `heroku config:set MONGO_URI=your_uri`
- [ ] Deploy: `git push heroku main`

## Frontend Deployment (Choose One)

### Option A: Vercel (Recommended - Free)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Navigate to frontend: `cd frontend`
- [ ] Update `.env`: `REACT_APP_API_URL=https://your-backend-url.com`
- [ ] Deploy: `vercel --prod`
- [ ] Or use Vercel dashboard with GitHub integration

### Option B: Netlify
- [ ] Sign up at netlify.com
- [ ] New site from Git
- [ ] Connect repository
- [ ] Set base directory: `frontend`
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `build`
- [ ] Add environment variable: `REACT_APP_API_URL`
- [ ] Deploy

### Option C: GitHub Pages
- [ ] Update `package.json`: Add `"homepage": "https://username.github.io/repo"`
- [ ] Install gh-pages: `npm install --save-dev gh-pages`
- [ ] Add scripts:
  ```json
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
  ```
- [ ] Deploy: `npm run deploy`

## Post-Deployment Verification

- [ ] Backend health check: `curl https://your-backend-url.com/health`
- [ ] Test API endpoints:
  - [ ] GET `/products` - Returns product list
  - [ ] GET `/cart` - Returns cart items
- [ ] Frontend loads correctly
- [ ] Check browser console for errors
- [ ] Test all features in production:
  - [ ] View products
  - [ ] Add to cart
  - [ ] Update cart quantities
  - [ ] Remove from cart
  - [ ] Switch to seller mode
  - [ ] Add new product
  - [ ] Edit product
  - [ ] Delete product
  - [ ] Search products

## Security Hardening

- [ ] Update CORS in backend to allow only your frontend domain
- [ ] Change MongoDB IP whitelist from `0.0.0.0/0` to specific IPs
- [ ] Rotate MongoDB credentials if exposed in Git
- [ ] Enable MongoDB Atlas backup
- [ ] Add rate limiting to backend
- [ ] Enable HTTPS (automatic on Vercel/Netlify/Render)
- [ ] Set secure environment variables on hosting platforms
- [ ] Remove console.log statements from production code

## Performance Optimization

- [ ] Enable Gzip compression on backend
- [ ] Use CDN for images (Cloudinary/S3)
- [ ] Minify CSS/JS (automatic with Create React App)
- [ ] Enable caching headers
- [ ] Monitor MongoDB performance in Atlas dashboard
- [ ] Setup error tracking (Sentry)

## Monitoring & Maintenance

- [ ] Setup uptime monitoring (UptimeRobot - free)
- [ ] Configure error logging
- [ ] Setup automated backups
- [ ] Create runbook for common issues
- [ ] Document deployment process
- [ ] Schedule regular dependency updates

## Domain Setup (Optional)

- [ ] Purchase domain (Namecheap, GoDaddy, Google Domains)
- [ ] Add custom domain in Vercel/Netlify dashboard
- [ ] Configure DNS records:
  - A record: Point to deployment IP
  - CNAME: Point www to deployment URL
- [ ] Enable SSL (automatic on most platforms)
- [ ] Test: `https://yourdomain.com`

## Troubleshooting Common Issues

### Backend Issues
- **Can't connect to MongoDB**
  - Check MONGO_URI format
  - Verify IP whitelist
  - Check database user permissions
  
- **Port already in use**
  - Use environment variable PORT
  - Check if another service is running
  
- **Module not found**
  - Run `npm install`
  - Check package.json dependencies

### Frontend Issues
- **API not responding**
  - Verify REACT_APP_API_URL is correct
  - Check CORS configuration in backend
  - Restart frontend after changing .env
  
- **Build fails**
  - Check for TypeScript errors
  - Verify all dependencies are installed
  - Check Node version compatibility
  
- **Blank page after deployment**
  - Check browser console for errors
  - Verify build completed successfully
  - Check route configuration

### CORS Errors
```javascript
// backend/index.js
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

## Success Metrics

- [ ] Application loads in < 3 seconds
- [ ] All API calls succeed
- [ ] No console errors in browser
- [ ] Mobile responsive works correctly
- [ ] All user flows complete successfully
- [ ] Backend responds to requests in < 500ms
- [ ] Database queries complete quickly

## Next Steps After Deployment

1. Share the link with stakeholders
2. Gather user feedback
3. Monitor error logs
4. Plan feature enhancements
5. Setup CI/CD pipeline (GitHub Actions)
6. Add automated testing
7. Setup staging environment

---

## Quick Commands Reference

```bash
# Test backend locally
cd backend && npm install && npm start

# Test frontend locally
cd frontend && npm install && npm start

# Build frontend for production
cd frontend && npm run build

# Deploy with Docker
docker-compose up --build -d

# View Docker logs
docker-compose logs -f

# Stop Docker containers
docker-compose down

# Deploy to Vercel
cd frontend && vercel --prod

# Check backend health
curl https://your-backend-url.com/health

# Test products API
curl https://your-backend-url.com/products
```

---

**Last Updated**: February 8, 2026
**Version**: 1.0.0
