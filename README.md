# 🏫 School Management API

A clean and simple **Node.js + Express + MySQL** REST API to manage schools — add schools and retrieve them sorted by proximity to a user's location.

---

## 🔗 Links

| | Link |
|---|---|
| 🚀 **Live API** | https://school-management-api-z0eu.onrender.com |
| 📦 **GitHub Repo** | https://github.com/Sufalthakre18/school-management-api |
| 📬 **Postman Collection** | [Download Postman Collection](./school-management.postman_collection.json) |

---

## 📡 API Endpoints

### Base URL
```
https://school-management-api-z0eu.onrender.com
```

---

### ✅ Health Check
```
GET /
```
**Response:**
```json
{
  "success": true,
  "message": "School Management API is running 🚀"
}
```

---

### ✅ Add School
```
POST /addschool
```

**Request Body:**
```json
{
  "name": "La Martiniere School",
  "address": "Elgin Road, Kolkata",
  "latitude": 22.5448,
  "longitude": 88.3426
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "La Martiniere School",
    "address": "Elgin Road, Kolkata",
    "latitude": 22.5448,
    "longitude": 88.3426
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "errors": [
    "name is required and must be a non-empty string."
  ]
}
```

---

### ✅ List Schools (sorted by proximity)
```
GET /listschools?latitude=22.5448&longitude=88.3426
```

**Query Parameters:**

| Parameter | Type | Required |
|---|---|---|
| latitude | Float | ✅ Yes |
| longitude | Float | ✅ Yes |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Found 4 school(s), sorted by proximity.",
  "user_location": {
    "latitude": 22.5448,
    "longitude": 88.3426
  },
  "data": [
    {
      "id": 4,
      "name": "La Martiniere School",
      "address": "Elgin Road, Kolkata",
      "latitude": 22.5448,
      "longitude": 88.3426,
      "distance_km": 0
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5355,
      "longitude": 77.291,
      "distance_km": 1292.51
    }
  ]
}
```

---

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── config/
│   │   └── db.js                  # MySQL connection pool + auto table setup
│   ├── controllers/
│   │   └── schoolController.js    # Add & List business logic
│   ├── middleware/
│   │   └── validate.js            # Input validation
│   ├── routes/
│   │   └── schoolRoutes.js        # Route definitions
│   └── app.js                     # Express entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/Sufalthakre18/school-management-api.git
cd school-management-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=3000
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=railway
```

### 4. Run the server
```bash
npm start
```

Server runs at: `http://localhost:3000`

> ✅ Database table is auto-created on first run — no manual SQL needed.

---

## 🗄️ Database Schema

```sql
CREATE TABLE IF NOT EXISTS schools (
  id         INT           AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  address    VARCHAR(500)  NOT NULL,
  latitude   FLOAT         NOT NULL,
  longitude  FLOAT         NOT NULL,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📏 Distance Calculation

Uses the **Haversine Formula** to calculate real geographical distance between two coordinates:

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
d = 2R × atan2(√a, √(1−a))     where R = 6371 km
```

Schools are sorted **nearest first** based on this distance.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MySQL2 | Database driver |
| dotenv | Environment variables |
| CORS | Cross-origin support |

---

## 👨‍💻 Author

GitHub: [@Sufalthakre18](https://github.com/Sufalthakre18)