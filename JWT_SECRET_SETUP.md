# 🔐 COMPLETE ENVIRONMENT VARIABLES SETUP

## For Vercel Dashboard (Production)

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### **Required Variables:**
```
MONGODB_URI=mongodb+srv://basan:DLTqybe83hWOXqdk@cluster0.68b6a.mongodb.net
JWT_SECRET=f15d83aee1165e94d423df32f7da94308425a645127623c6c3e28b0c4f8e44b841d444f881289f5329862af0b1672180c0fddc9d9e4231374016c1164819350e
ADMIN_EMAIL=admin@hospital.com
ADMIN_PASSWORD=admin123
```

### **Optional (for file uploads):**
```
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## How to Add in Vercel:

1. **Go to**: https://vercel.com/dashboard
2. **Select** your project: `hospital-...`
3. **Click**: Settings tab
4. **Click**: Environment Variables
5. **Add** each variable:
   - Name: `JWT_SECRET`
   - Value: `f15d83aee1165e94d423df32f7da94308425a645127623c6c3e28b0c4f8e44b841d444f881289f5329862af0b1672180c0fddc9d9e4231374016c1164819350e`
   - Environment: `Production`, `Preview`, `Development`
6. **Click**: Save
7. **Redeploy** your application

## ⚡ After Adding Variables:

Your JWT authentication will work for:
- ✅ User login/registration
- ✅ Protected routes (appointments, profile)
- ✅ Admin authentication
- ✅ Doctor authentication

## 🔒 Security Notes:

- ✅ **Never share** your JWT secret publicly
- ✅ **Use different secrets** for development/production (optional)
- ✅ **Keep secrets secure** in environment variables only
- ✅ **Never commit** secrets to Git

**Your JWT secret is now ready to use!** 🎉
