#!/bin/bash

# Prescripto Hospital Management System - Deployment Script

echo "🏥 Deploying Prescripto Hospital Management System..."

# Step 1: Install dependencies for all parts
echo "📦 Installing dependencies..."

# Backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install
cd ..

# Client-side dependencies  
echo "Installing client-side dependencies..."
cd clientside && npm install
cd ..

# Admin dependencies
echo "Installing admin dependencies..."
cd admin && npm install
cd ..

# Step 2: Build client-side application
echo "🔨 Building client-side application..."
cd clientside && npm run build
cd ..

# Step 3: Build admin application
echo "🔨 Building admin application..."
cd admin && npm run build
cd ..

echo "✅ All components built successfully!"

# Step 4: Environment setup
echo "🔧 Setting up environment..."

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env file not found. Please create it with required environment variables."
fi

if [ ! -f "clientside/.env" ]; then
    echo "⚠️  clientside/.env file not found. Please create it with VITE_BACKEND_URL."
fi

if [ ! -f "admin/.env" ]; then
    echo "⚠️  admin/.env file not found. Please create it with VITE_BACKEND_URL."
fi

echo "🚀 Ready for deployment!"
echo ""
echo "📋 Deployment Options:"
echo "1. Single Platform (Current setup) - Deploy the root folder"
echo "2. Separate Deployments:"
echo "   - Deploy /clientside as main website"
echo "   - Deploy /admin as admin panel"  
echo "   - Deploy /backend as API server"
echo ""
echo "🔗 After deployment, update environment variables:"
echo "   - VITE_BACKEND_URL in clientside/.env"
echo "   - VITE_BACKEND_URL in admin/.env"
echo "   - Database and API keys in backend/.env"
