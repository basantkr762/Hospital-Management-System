# Hospital Management System - Deployment Workflow

## Overview
This project consists of three parts that work together like the reference site (https://prescripto.vercel.app/):

1. **Client Side** (Patient Portal) - Main website for patients
2. **Admin Panel** - Dashboard for administrators and doctors  
3. **Backend** - API server for both frontend applications

## Deployment Strategy

### Option 1: Separate Deployments (Recommended)

#### 1. Deploy Client Side (Main Website)
```bash
# Deploy from clientside folder
cd clientside
npm install
npm run build
```
- **Vercel Settings:**
  - Root Directory: `clientside`
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`

#### 2. Deploy Admin Panel  
```bash
# Deploy from admin folder
cd admin
npm install
npm run build
```
- **Vercel Settings:**
  - Root Directory: `admin`
  - Framework: Vite
  - Build Command: `npm run build` 
  - Output Directory: `dist`

#### 3. Deploy Backend API
```bash
# Deploy from backend folder
cd backend
npm install
```
- **Vercel Settings:**
  - Root Directory: `backend`
  - Framework: Other
  - Build Command: (leave empty)
  - Output Directory: (leave empty)

### Option 2: Root Deployment (Current Setup)

Use the root `vercel.json` configuration that's already set up.

## Environment Variables

### Client Side (.env)
```
VITE_BACKEND_URL=https://your-backend-url.vercel.app
VITE_ADMIN_URL=https://your-admin-panel-url.vercel.app
```

### Admin Panel (.env)
```
VITE_BACKEND_URL=https://your-backend-url.vercel.app
```

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_NAME=your_cloudinary_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@hospital.com
ADMIN_PASSWORD=admin123
```

## Workflow Like Reference Site

### User Journey:
1. **Home Page** → Browse specialities and top doctors
2. **Doctor Listings** → Filter by speciality, view doctor profiles
3. **Book Appointment** → Select time slots, provide details
4. **User Authentication** → Login/Register for patients
5. **My Appointments** → View and manage bookings
6. **Admin Panel** → Separate interface for staff (accessible via navbar link)

### Admin Journey:
1. **Admin Login** → Authenticate as admin or doctor
2. **Dashboard** → View statistics and recent appointments
3. **Manage Doctors** → Add/edit doctor profiles
4. **Appointments** → View and manage all bookings
5. **Doctor Dashboard** → Individual doctor interface

## Features Implemented

✅ **Patient Portal:**
- Responsive homepage with hero section
- Speciality-based doctor search
- Top doctors showcase
- Appointment booking system
- User authentication
- Profile management
- Appointment history

✅ **Admin Panel:**
- Admin and doctor login
- Dashboard with statistics
- Doctor management
- Appointment management
- Profile management

✅ **Backend API:**
- User authentication
- Doctor management
- Appointment system
- Image upload (Cloudinary)
- MongoDB integration

## Next Steps

1. Update environment variables with your deployed URLs
2. Deploy each component separately
3. Test the complete workflow
4. Configure domain (optional)

## Reference Implementation
Your workflow now matches: https://prescripto.vercel.app/
- Same navigation structure
- Same user flow
- Same admin panel integration
- Same responsive design
