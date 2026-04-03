# Lead Management Backend API

# Overview

This project is a backend system built using **Node.js, Express, and MongoDB** to manage customer leads and their follow-ups.

It supports creating leads, tracking updates, scheduling follow-ups, and extracting structured data from user messages.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

# Features

# Create Lead

* Add new lead with fields: name, phone, project, budget, source, intent
* Prevent duplicate phone numbers
* Automatically store timestamps

---

# Get Leads

* Pagination support (page, limit)
* Filtering (intent, status, project, source)
* Sorting (latest first)

---

# Update Lead Status

* Update lead status using PATCH
* Allowed values: new, contacted, converted, lost

---

# Follow-up Scheduler

* Add follow-ups for each lead
* Validate that date is in the future
* Maintain follow-up history
* Update next follow-up date

---

# AI-based Lead Qualification

* Extract structured data from user message (rule-based)
* Example:

text
Input:  "Looking for 2BHK under 60L urgent"
Output: { project: "2BHK", budget: 6000000, intent: "high" }


---

# API Endpoints

# Create Lead

http
POST /api/leads


---

# Get Leads

http
GET /api/leads?page=1&limit=5&intent=high


---

# Update Lead Status

http
PATCH /api/leads/:id


---

# Add Follow-up

http
POST /api/leads/:id/followUp


---

# AI Qualification

http
POST /api/leads/ai/qualify


---

# Setup Instructions

# 1️ Install dependencies

bash
npm install


# 2️ Create .env file

env
MONGO_URI=your_mongodb_connection
PORT=5000


# 3️ Run the server

bash
npm run dev


---

# Server

text
http://localhost:5000


---

# Project Structure

text
controllers/
models/
routes/
config/
app.js
server.js



---

# Notes

* Uses MongoDB Atlas (cloud database)
* Can be switched to a local MOngoDb instance by changing the connection string in config/database.js
* Follows MVC architecture
* API tested using Postman

---
