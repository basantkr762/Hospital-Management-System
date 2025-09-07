# Hospital Management System (Prescripto)

A comprehensive hospital management system built with React, Node.js, Express, and MongoDB. The system includes patient portal, admin dashboard, and doctor dashboard with appointment management, user authentication, and medical records.

## 🏗️ Project Structure

```
Hospital-Management-System/
├── backend/          # Node.js API server
├── clientside/       # Patient portal (React)
├── admin/           # Admin & Doctor dashboard (React)
├── api/             # Serverless API functions
└── vercel.json      # Deployment configuration
```

## 🚀 Features

### Patient Portal
- User registration and authentication
- Doctor search and filtering
- Appointment booking
- Profile management
- Medical history

### Admin Dashboard
- Doctor management (add, edit, remove)
- Appointment oversight
- User management
- Analytics and reports

### Doctor Dashboard
- Appointment management
- Patient records
- Schedule management
- Profile settings

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account (for image uploads)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd Hospital-Management-System

# Install all dependencies
npm run install-all
```

### 2. Environment Configuration

#### Backend Environment (`.env` in backend folder):
```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
DB_NAME=HospitalManagement

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Admin Configuration
ADMIN_EMAIL=admin@hospital.com
ADMIN_PASSWORD=admin123

# Server Configuration
PORT=4000
NODE_ENV=development
```

#### Frontend Environment (`.env` in clientside folder):
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_ADMIN_URL=/admin
VITE_APP_NAME=Hospital Management System
```

#### Admin Environment (`.env` in admin folder):
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_APP_NAME=Hospital Management System
```

### 3. Database Setup

1. Create a MongoDB database (local or Atlas)
2. Update the `MONGODB_URI` in backend/.env
3. The application will create necessary collections automatically

### 4. Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Update the Cloudinary variables in backend/.env

## 🏃‍♂️ Running the Application

### Development Mode (All services)
```bash
npm run dev
```
This will start:
- Backend server on `http://localhost:4000`
- Client (Patient Portal) on `http://localhost:5173`
- Admin Dashboard on `http://localhost:5174`

### Individual Services
```bash
# Backend only
npm run backend

# Client only
npm run client

# Admin only
npm run admin
```

### Production Build
```bash
npm run build
```

## 📱 Application URLs

- **Patient Portal**: `http://localhost:5173`
- **Admin/Doctor Login**: `http://localhost:5174`
- **API Server**: `http://localhost:4000`
- **API Documentation**: `http://localhost:4000/api`

## 🔐 Default Credentials

### Admin Login
- Email: `admin@hospital.com`
- Password: `admin123`

### Test Doctor (after setup)
- Doctors are created through admin dashboard
- Each doctor gets login credentials via the admin panel

## 🚀 Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   ```env
   MONGODB_URI=your_mongodb_connection
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret
   ADMIN_EMAIL=admin@hospital.com
   ADMIN_PASSWORD=admin123
   ```

3. Update frontend environment variables:
   ```env
   VITE_BACKEND_URL=https://your-app.vercel.app/api
   ```

4. Deploy using:
   ```bash
   vercel --prod
   ```

## 🔧 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /get-profile` - Get user profile
- `POST /update-profile` - Update user profile
- `GET /doctors` - Get all doctors
- `POST /book-appointment` - Book appointment

### Admin Routes (`/api/admin`)
- `POST /add-doctor` - Add new doctor
- `POST /login` - Admin login
- `GET /appointments` - Get all appointments
- `GET /dashboard` - Dashboard statistics

### Doctor Routes (`/api/doctor`)
- `POST /login` - Doctor login
- `GET /appointments` - Get doctor appointments
- `POST /complete-appointment` - Mark appointment complete
- `GET /dashboard` - Doctor dashboard data

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- CORS configuration
- Environment variable protection

## 📊 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer + Cloudinary
- **Validation**: Custom middleware

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### DevOps
- **Deployment**: Vercel
- **Environment**: Node.js serverless functions
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary CDN

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend URL is correctly set in frontend .env files
   - Check CORS configuration in backend/server.js

2. **Database Connection**
   - Verify MongoDB URI in backend/.env
   - Check network access in MongoDB Atlas

3. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits

4. **Build Errors**
   - Run `npm run install-all` to ensure all dependencies are installed
   - Clear node_modules and reinstall if needed

## 📈 Future Enhancements

- [ ] Payment integration
- [ ] SMS/Email notifications
- [ ] Video consultation
- [ ] Mobile application
- [ ] Advanced reporting
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@hospital.com or create an issue in the repository.
