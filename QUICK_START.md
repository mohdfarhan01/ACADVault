# AcadVault - Quick Start Guide

## Prerequisites Checklist
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed and running OR MongoDB Atlas account
- [ ] Firebase account (optional, for file storage)
- [ ] Code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Backend Setup (5 minutes)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env with your settings (see below)

# Start MongoDB locally (if not using Atlas)
# mongod --dbpath="C:\data\db"

# Start backend server
npm run dev
```

**Backend .env Configuration:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/acadvault
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:3000
```

**MongoDB Atlas Alternative:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/acadvault
```

**Backend should now be running on:** http://localhost:5000

### 2. Frontend Setup (3 minutes)

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend
npm start
```

**Frontend should now be running on:** http://localhost:3000

### 3. Test the Application

1. **Open browser:** http://localhost:3000
2. **Register a new account:**
   - Click "Get Started" or "Register"
   - Fill in details
   - Select role (Student, Faculty, Organizer, or Recruiter)
   - Submit

3. **Explore based on role:**

**As Student:**
- Dashboard → View stats
- Add Activity → Create new achievement
- My Activities → View all activities
- My Portfolio → Manage portfolio

**As Faculty:**
- Dashboard → View pending verifications
- Verify Activities → Review and approve/reject

**As Organizer:**
- Create Event → Set up new event
- Events → Manage all events

**As Recruiter:**
- Search Students → Find candidates
- View Portfolios → Access student profiles

**As Admin:**
- Dashboard → System overview
- Reports → Generate accreditation reports

## Common Issues & Solutions

### Backend won't start
**Problem:** `Cannot connect to MongoDB`
**Solution:**
- Ensure MongoDB is running locally, OR
- Use MongoDB Atlas connection string
- Check MONGODB_URI in .env

### Frontend can't reach backend
**Problem:** `Network Error` or `CORS error`
**Solution:**
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in frontend .env
- Ensure FRONTEND_URL in backend .env matches

### Dependencies installation fails
**Problem:** `npm install` errors
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Default Test Accounts

Create these manually after setup:

**Student Account:**
- Email: student@test.com
- Password: test123
- Role: Student

**Faculty Account:**
- Email: faculty@test.com
- Password: test123
- Role: Faculty

**Admin Account:**
- Email: admin@test.com
- Password: test123
- Role: Admin

## File Upload Setup (Optional)

For production file uploads, configure Firebase:

1. Go to Firebase Console
2. Create new project
3. Enable Storage
4. Get credentials
5. Add to backend .env:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
```

Without Firebase, local file storage will be used.

## Development Tips

### Hot Reload
- Backend: Uses nodemon (auto-restarts on file changes)
- Frontend: Uses React hot reload (instant updates)

### Database Management
- Use MongoDB Compass for GUI: mongodb://localhost:27017
- Or use command line: `mongo` or `mongosh`

### Testing API Endpoints
- Use Postman or Thunder Client
- Import base URL: http://localhost:5000/api
- Add token to Authorization header for protected routes

### Clear Data
```bash
# Connect to MongoDB
mongosh

# Switch to database
use acadvault

# Drop collections
db.users.drop()
db.activities.drop()
db.events.drop()
```

## Next Steps

1. **Customize branding:**
   - Update colors in `frontend/tailwind.config.js`
   - Change logo in `frontend/src/pages/LandingPage.js`

2. **Add institutional data:**
   - Login as admin
   - Create departments
   - Add institutional activities

3. **Invite users:**
   - Share registration link
   - Assign appropriate roles

4. **Configure email:**
   - Add SMTP settings to backend .env
   - Enable email notifications

5. **Deploy to production:**
   - Follow deployment guides in main README
   - Set NODE_ENV=production
   - Use secure secrets

## Getting Help

**Issue Tracker:** Create an issue in the repository
**Documentation:** See full README.md
**Logs:** Check terminal output for errors

## Quick Commands Reference

```bash
# Backend
cd backend
npm run dev          # Start development server
npm start            # Start production server

# Frontend  
cd frontend
npm start            # Start development server
npm run build        # Create production build

# Database
mongod               # Start MongoDB locally
mongosh              # MongoDB shell

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

**You're all set! 🎉**

The application should now be running with:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- Database: mongodb://localhost:27017/acadvault
