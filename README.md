
# 🏫 School Management API

This is a simple RESTful API built with **Express.js** and **MySQL** that allows you to:

- Add a new school
- List all schools sorted by proximity to a given location

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Deployment**: Railway (optional)

---

## 🚀 Setup Instructions

### 1. Clone the Repository


git clone https://github.com/yourusername/school-management-api.git
cd school-management-api


### 2. Install Dependencies


npm install


### 3. Configure Database

Create a `.env` file in the root directory and add your MySQL credentials:


DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name


Make sure your database has the following table:


CREATE TABLE school (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);


### 4. Start the Server


npm start


Server will start at `http://localhost:3000`.

---

## 📬 API Endpoints

### ➕ Add School

- **URL**: `/api/addSchool`
- **Method**: `POST`
- **Body**:


{
  "name": "Sample School",
  "address": "123 Example St, City, Country",
  "latitude": 40.7128,
  "longitude": -74.0060
}


- **Response**:


{
  "message": "School added",
  "id": 1
}


---

### 📍 List Schools by Proximity

- **URL**: `/api/listSchools?latitude=40.7128&longitude=-74.0060`
- **Method**: `GET`

- **Response**:


[
  {
    "id": 1,
    "name": "Sample School",
    "address": "123 Example St, City, Country",
    "latitude": 40.7128,
    "longitude": -74.006,
    "distance": 0
  },
  ...
]


Schools are sorted by distance in ascending order.

---

## 🌐 Deployment (Railway)

To deploy on [Railway](https://railway.app):


railway init
railway up
