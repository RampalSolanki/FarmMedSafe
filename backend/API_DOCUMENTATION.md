# Farm Management API - Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas Account
- Environment Variables (.env file)

### Installation & Running

```bash
# Navigate to backend config directory
cd backend/config

# Install dependencies (if not already installed)
npm install

# Seed demo data (creates demo users and animals)
npm run seed:demo

# Start the server
npm start
```

Server will run on: **http://localhost:5000**

---

## 📋 Demo Credentials

Use these credentials to test the API:

### Farmer Account
- **Email:** `farmer@demo.com`
- **Password:** `password123`

### Admin Account  
- **Email:** `admin@demo.com`
- **Password:** `admin123`

---

## 🔌 API Endpoints

### Health Check (Public - No Auth Required)
```
GET /
GET /health
```

### Authentication Routes
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "farmer"
}

POST /api/auth/login
{
  "email": "farmer@demo.com",
  "password": "password123"
}
Returns: { token, _id, name, email, role }

GET /api/auth/me
(Requires: Authorization: Bearer <token>)
```

### Animals Routes (Requires Auth)
```
GET /api/animals
(Lists all animals for authenticated user)

POST /api/animals
{
  "animalId": "COW001",
  "name": "Radha",
  "type": "cow",
  "breed": "Holstein",
  "age": { "years": 3, "months": 6 },
  "weight": { "value": 550, "unit": "kg" },
  "gender": "female"
}

GET /api/animals/:id
(Get specific animal)

PUT /api/animals/:id
(Update animal)

DELETE /api/animals/:id
(Soft delete - marks as inactive)
```

### Medicines Routes
```
GET /api/medicines/catalog
(Public - View medicine catalog)

GET /api/medicines/search?q=Penicillin
(Public - Search medicines)

POST /api/medicines/entry
(Requires Auth - Add medicine entry)
{
  "animalId": "ANIMAL_ID",
  "medicineId": "MEDICINE_ID",
  "doseGiven": { "value": 250, "unit": "ml" },
  "route": "injection",
  "dateGiven": "2024-01-15",
  "reason": "Bacterial infection"
}

GET /api/medicines/history
(Requires Auth - Get medicine history for user's animals)
```

### Admin Routes (Requires Admin Role)
```
GET /api/admin/stats
(Dashboard statistics)

GET /api/admin/farmers
(List all farmers)

GET /api/admin/unsafe-entries
(List potentially unsafe medicine entries)
```

---

## 🔐 Authentication Flow

1. **Login** - Get JWT token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@demo.com","password":"password123"}'
```

2. **Use Token** - Include in all protected requests
```bash
curl -X GET http://localhost:5000/api/animals \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🧪 Testing Endpoints with curl

### Health Check
```bash
curl http://localhost:5000/health
```

### Get Medicines Catalog (No Auth Required)
```bash
curl http://localhost:5000/api/medicines/catalog
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@demo.com","password":"password123"}'
```

### Get Animals (With Token)
```bash
curl -X GET http://localhost:5000/api/animals \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

---

## 📦 Demo Data Included

**Animals:**
- Radha (Cow) - COW001
- Krishna (Buffalo) - BUF001  
- Moti (Goat) - GOAT001

**Medicines:**
- Oxytetracycline (Antibiotic)
- Penicillin G (Antibiotic)
- Ivermectin (Dewormer)

**Medicine Entries:**
- 2 sample entries for demo animals

---

## 🔧 Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
JWT_SECRET=rampal@1234#@23
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## ⚠️ Troubleshooting

### MongoDB Connection Error
- Ensure IP whitelist includes your current IP in MongoDB Atlas
- Check MONGODB_URI is correct
- Verify JWT_SECRET is set in .env

### 401 Unauthorized Error
- Ensure you're including the `Authorization: Bearer <token>` header
- Token may have expired (JWT_EXPIRE is 30 days)
- Try logging in again to get a new token

### Port Already in Use
- Change PORT in .env or kill the process using port 5000

### Reset Database
```bash
npm run seed:demo  # Clears and repopulates with demo data
```

---

## 📞 API Response Format

### Success Response
```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k",
  "name": "Radha",
  "type": "cow",
  ...
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

---

## ✅ Ready for Demo!

Your backend is now configured and running with:
- ✅ Database connected
- ✅ Demo data seeded
- ✅ Authentication working
- ✅ All endpoints tested
- ✅ Public endpoints available (health check, medicines catalog)
- ✅ Protected endpoints with auth middleware

**Tomorrow's Presentation:** Explain how farmers can register, add their animals, track medicine usage, and see MRL (Maximum Residue Limit) compliance warnings!
