# Engineering Consulting Platform - সম্পূর্ণ ডকুমেন্টেশন

## প্রজেক্ট সম্পর্কে (বাংলায়)

এটি একটি **Engineering Consulting Platform** যেখানে:
- Engineers তাদের সার্ভিস প্রদান করে
- Clients Engineer দের হায়ার করে প্রজেক্টের জন্য
- Admin সবকিছু নিয়ন্ত্রণ করে

এটি Upwork বা Fiverr এর মতো, শুধু Engineering সার্ভিসের জন্য।

---

## সিস্টেমের তিনটি ব্যবহারকারী (Role)

### 1. ADMIN (প্রশাসক)
**কাজ:**
- সব ইউজার ম্যানেজ করা (Add, Edit, Delete)
- সব প্রজেক্ট দেখা এবং নিয়ন্ত্রণ করা
- সার্ভিস রিকোয়েস্ট অনুমোদন/প্রত্যাখ্যান করা
- টিম অনুমোদন করা
- ব্লগ পোস্ট লেখা এবং প্রকাশ করা
- ড্যাশবোর্ড স্ট্যাটিস্টিক্স দেখা

**Permission Level:** সর্বোচ্চ

---

### 2. ENGINEER (ইঞ্জিনিয়ার)
**কাজ:**
- নিজের প্রোফাইল তৈরি এবং এডিট করা
- নিজের প্রজেক্ট তৈরি করা
- ক্লায়েন্টের প্রজেক্ট দেখে গ্রহণ করা
- প্রজেক্ট স্ট্যাটাস আপডেট করা (In Progress → Completed)
- টিম তৈরি করা এবং সদস্য যোগ করা
- কল বুকিং করা
- রিকোয়েস্ট গ্রহণ করা

**Permission Level:** মাঝারি

---

### 3. CLIENT (ক্লায়েন্ট)
**কাজ:**
- নিজের প্রোফাইল তৈরি এবং এডিট করা
- নতুন প্রজেক্ট পোস্ট করা (Engineer দের জন্য)
- প্রজেক্ট স্ট্যাটাস ট্র্যাক করা
- Engineer কে রিকোয়েস্ট পাঠানো
- কল বুকিং করা
- একই Engineer কে "Hire Again" করা

**Permission Level:** সীমিত

---

## ডাটাবেস স্ট্রাকচার (MongoDB Collections)

### Users Collection
\`\`\`json
{
  "_id": "ObjectId",
  "name": "করিম আহমেদ",
  "email": "karim@example.com",
  "password": "hashed_password",
  "role": "engineer",
  "profile": {
    "avatar": "url",
    "bio": "২০ বছরের অভিজ্ঞতা",
    "skills": ["React", "Node.js", "MongoDB"],
    "rating": 4.8
  },
  "createdAt": "2024-11-09T10:00:00Z"
}
\`\`\`

### Projects Collection
\`\`\`json
{
  "_id": "ObjectId",
  "title": "ওয়েবসাইট তৈরি",
  "description": "আমার একটি ই-কমার্স ওয়েবসাইট দরকার",
  "client": "ObjectId(client_id)",
  "engineer": "ObjectId(engineer_id)",
  "budget": 50000,
  "status": "in_progress",
  "progress": 60,
  "timeline": "2024-12-15",
  "createdAt": "2024-11-09T10:00:00Z"
}
\`\`\`

**Status এর সম্ভাব্য মান:**
- `pending` - অপেক্ষমাণ
- `in_progress` - চলমান
- `completed` - সম্পন্ন
- `rejected` - প্রত্যাখ্যাত

### Teams Collection
\`\`\`json
{
  "_id": "ObjectId",
  "name": "করিমের টিম",
  "leader": "ObjectId(engineer_id)",
  "members": ["ObjectId(member1)", "ObjectId(member2)"],
  "badge": "gold",
  "status": "approved",
  "description": "Full Stack ডেভেলপমেন্ট টিম",
  "createdAt": "2024-11-09T10:00:00Z"
}
\`\`\`

### Requests Collection
\`\`\`json
{
  "_id": "ObjectId",
  "client": "ObjectId(client_id)",
  "engineer": "ObjectId(engineer_id)",
  "title": "ওয়েবসাইট ডেভেলপমেন্ট",
  "description": "আমার একটি React অ্যাপ দরকার",
  "budget": 30000,
  "status": "pending",
  "createdAt": "2024-11-09T10:00:00Z"
}
\`\`\`

**Status এর সম্ভাব্য মান:**
- `pending` - অপেক্ষমাণ
- `approved` - অনুমোদিত
- `rejected` - প্রত্যাখ্যাত

### Bookings Collection
\`\`\`json
{
  "_id": "ObjectId",
  "engineer": "ObjectId(engineer_id)",
  "client": "ObjectId(client_id)",
  "date": "2024-11-15",
  "time": "14:00",
  "duration": 30,
  "topic": "প্রজেক্ট ডিসকাশন",
  "status": "scheduled",
  "createdAt": "2024-11-09T10:00:00Z"
}
\`\`\`

---

## API এন্ডপয়েন্ট (সব পথ)

### অথেন্টিকেশন API

#### রেজিস্টার করা
\`\`\`
POST /api/auth/register

Request Body:
{
  "name": "করিম আহমেদ",
  "email": "karim@example.com",
  "password": "secure123",
  "role": "engineer"
}

Response:
{
  "success": true,
  "message": "অ্যাকাউন্ট তৈরি সফল হয়েছে",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "ObjectId",
    "name": "করিম আহমেদ",
    "role": "engineer"
  }
}
\`\`\`

#### লগইন করা
\`\`\`
POST /api/auth/login

Request Body:
{
  "email": "karim@example.com",
  "password": "secure123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "ObjectId",
    "name": "করিম আহমেদ",
    "role": "engineer"
  }
}
\`\`\`

#### প্রোফাইল আপডেট
\`\`\`
PUT /api/auth/profile

Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Request Body:
{
  "name": "করিম আহমেদ",
  "bio": "২০ বছরের অভিজ্ঞতা",
  "skills": ["React", "Node.js"]
}

Response:
{
  "success": true,
  "message": "প্রোফাইল আপডেট হয়েছে",
  "user": { ... }
}
\`\`\`

---

### প্রজেক্ট API

#### নতুন প্রজেক্ট তৈরি (Client)
\`\`\`
POST /api/projects

Request Body:
{
  "title": "ওয়েবসাইট তৈরি",
  "description": "আমার একটি ই-কমার্স সাইট দরকার",
  "budget": 50000,
  "timeline": "2024-12-15"
}

Response:
{
  "success": true,
  "message": "প্রজেক্ট তৈরি হয়েছে",
  "project": {
    "_id": "ObjectId",
    "title": "ওয়েবসাইট তৈরি",
    "status": "pending",
    "client": "ObjectId(client_id)"
  }
}
\`\`\`

#### সব প্রজেক্ট দেখা
\`\`\`
GET /api/projects

Response:
{
  "success": true,
  "projects": [
    {
      "_id": "ObjectId",
      "title": "ওয়েবসাইট তৈরি",
      "status": "in_progress",
      "client": { "name": "ফাতিমা", ... },
      "engineer": { "name": "করিম", ... }
    }
  ]
}
\`\`\`

#### একটি প্রজেক্ট দেখা
\`\`\`
GET /api/projects/:projectId

Response:
{
  "success": true,
  "project": {
    "_id": "ObjectId",
    "title": "ওয়েবসাইট তৈরি",
    "description": "ই-কমার্স সাইট",
    "budget": 50000,
    "status": "in_progress",
    "progress": 60,
    "client": { ... },
    "engineer": { ... }
  }
}
\`\`\`

#### প্রজেক্ট স্ট্যাটাস পরিবর্তন (Engineer/Admin)
\`\`\`
PATCH /api/projects/:projectId/status

Request Body:
{
  "status": "completed"
}

Response:
{
  "success": true,
  "message": "স্ট্যাটাস আপডেট হয়েছে",
  "project": { ... }
}
\`\`\`

#### প্রজেক্ট এডিট (Owner)
\`\`\`
PUT /api/projects/:projectId

Request Body:
{
  "title": "নতুন শিরোনাম",
  "budget": 60000
}

Response:
{
  "success": true,
  "message": "প্রজেক্ট আপডেট হয়েছে",
  "project": { ... }
}
\`\`\`

#### প্রজেক্ট ডিলিট (Owner)
\`\`\`
DELETE /api/projects/:projectId

Response:
{
  "success": true,
  "message": "প্রজেক্ট ডিলিট হয়েছে"
}
\`\`\`

---

### সার্ভিস রিকোয়েস্ট API

#### নতুন রিকোয়েস্ট তৈরি (Client)
\`\`\`
POST /api/requests

Request Body:
{
  "engineer": "ObjectId(engineer_id)",
  "title": "ওয়েবসাইট ডেভেলপমেন্ট",
  "description": "একটি React অ্যাপ দরকার",
  "budget": 30000
}

Response:
{
  "success": true,
  "message": "রিকোয়েস্ট পাঠানো হয়েছে",
  "request": { ... }
}
\`\`\`

#### সব রিকোয়েস্ট দেখা (Admin)
\`\`\`
GET /api/requests

Response:
{
  "success": true,
  "requests": [ ... ]
}
\`\`\`

#### রিকোয়েস্ট অনুমোদন (Admin)
\`\`\`
PATCH /api/requests/:requestId/approve

Response:
{
  "success": true,
  "message": "রিকোয়েস্ট অনুমোদিত হয়েছে",
  "request": { ... }
}
\`\`\`

#### রিকোয়েস্ট প্রত্যাখ্যান (Admin)
\`\`\`
PATCH /api/requests/:requestId/reject

Response:
{
  "success": true,
  "message": "রিকোয়েস্ট প্রত্যাখ্যাত হয়েছে",
  "request": { ... }
}
\`\`\`

---

### কল বুকিং API

#### বুকিং তৈরি
\`\`\`
POST /api/bookings

Request Body:
{
  "engineer": "ObjectId(engineer_id)",
  "date": "2024-11-15",
  "time": "14:00",
  "duration": 30,
  "topic": "প্রজেক্ট ডিসকাশন"
}

Response:
{
  "success": true,
  "message": "বুকিং তৈরি হয়েছে",
  "booking": { ... }
}
\`\`\`

#### সব বুকিং দেখা
\`\`\`
GET /api/bookings

Response:
{
  "success": true,
  "bookings": [ ... ]
}
\`\`\`

#### বুকিং ক্যান্সেল করা
\`\`\`
PATCH /api/bookings/:bookingId/cancel

Response:
{
  "success": true,
  "message": "বুকিং ক্যান্সেল হয়েছে",
  "booking": { ... }
}
\`\`\`

#### বুকিং কমপ্লিট করা
\`\`\`
PATCH /api/bookings/:bookingId/complete

Response:
{
  "success": true,
  "message": "বুকিং সম্পন্ন হয়েছে",
  "booking": { ... }
}
\`\`\`

---

### টিম API

#### নতুন টিম তৈরি (Engineer)
\`\`\`
POST /api/teams

Request Body:
{
  "name": "করিমের টিম",
  "description": "Full Stack ডেভেলপমেন্ট টিম"
}

Response:
{
  "success": true,
  "message": "টিম তৈরি হয়েছে",
  "team": { ... }
}
\`\`\`

#### টিমে মেম্বার যোগ করা
\`\`\`
POST /api/teams/:teamId/members

Request Body:
{
  "engineer": "ObjectId(engineer_id)"
}

Response:
{
  "success": true,
  "message": "মেম্বার যোগ হয়েছে",
  "team": { ... }
}
\`\`\`

#### টিম অনুমোদন (Admin)
\`\`\`
PATCH /api/teams/:teamId/approve

Response:
{
  "success": true,
  "message": "টিম অনুমোদিত হয়েছে",
  "team": { ... }
}
\`\`\`

#### সব টিম দেখা
\`\`\`
GET /api/teams

Response:
{
  "success": true,
  "teams": [ ... ]
}
\`\`\`

---

### ব্লগ API

#### নতুন পোস্ট তৈরি (Admin)
\`\`\`
POST /api/blog

Request Body:
{
  "title": "ভালো কোডিং টিপস",
  "content": "এখানে আর্টিকেলের কন্টেন্ট...",
  "category": "Development"
}

Response:
{
  "success": true,
  "message": "পোস্ট তৈরি হয়েছে",
  "post": { ... }
}
\`\`\`

#### সব পাবলিশড পোস্ট দেখা
\`\`\`
GET /api/blog

Response:
{
  "success": true,
  "posts": [ ... ]
}
\`\`\`

#### পোস্ট পাবলিশ করা (Admin)
\`\`\`
PATCH /api/blog/:postId/publish

Response:
{
  "success": true,
  "message": "পোস্ট পাবলিশ হয়েছে",
  "post": { ... }
}
\`\`\`

---

## প্রজেক্টের ওয়ার্কফ্লো

### 1. রেজিস্ট্রেশন থেকে শুরু
\`\`\`
নতুন ইউজার আসে
    ↓
বেছে নেয় - Engineer নাকি Client?
    ↓
রেজিস্ট্রেশন করে
    ↓
JWT টোকেন পায়
    ↓
ড্যাশবোর্ডে প্রবেশ করে
\`\`\`

### 2. প্রজেক্ট শুরু হওয়ার প্রক্রিয়া
\`\`\`
Client নতুন প্রজেক্ট পোস্ট করে
    ↓
প্রজেক্ট Status: "pending"
    ↓
Engineer সেই প্রজেক্ট দেখে
    ↓
Engineer "Accept" ক্লিক করে
    ↓
Admin অনুমোদন করে (optional)
    ↓
প্রজেক্ট Status: "in_progress"
    ↓
Engineer কাজ করে, Progress আপডেট করে
    ↓
কাজ শেষ হলে Status: "completed"
    ↓
Client স্বীকৃতি দেয়
\`\`\`

---

## এরর হ্যান্ডলিং

### Success Response Format
\`\`\`json
{
  "success": true,
  "message": "অপারেশন সফল",
  "data": { ... }
}
\`\`\`

### Error Response Format
\`\`\`json
{
  "success": false,
  "message": "কিছু ভুল হয়েছে",
  "error": "DETAILED_ERROR_MESSAGE"
}
\`\`\`

### সাধারণ Error Codes
- `400` - Bad Request (ভুল ডাটা পাঠানো হয়েছে)
- `401` - Unauthorized (লগইন করতে হবে)
- `403` - Forbidden (এই কাজ করার অনুমতি নেই)
- `404` - Not Found (ডাটা পাওয়া যায়নি)
- `500` - Server Error (সার্ভারের সমস্যা)

---

## Installation এবং Setup

### প্রয়োজনীয় জিনিস
- Node.js (v16 বা উপরে)
- MongoDB (Local বা Cloud)
- npm বা yarn

### স্টেপ ১: প্রজেক্ট ক্লোন করা
\`\`\`bash
git clone <your-project-url>
cd backend
\`\`\`

### স্টেপ २: Dependencies ইনস্টল করা
\`\`\`bash
npm install
\`\`\`

### স্টেপ ३: Environment Variables সেটআপ
\`\`\`
.env ফাইল তৈরি করুন এবং নিচের জিনিস যোগ করুন:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/engineering-platform
JWT_SECRET=your_secret_key_here
NODE_ENV=development
\`\`\`

### স্টেপ ४: সার্ভার চালু করা
\`\`\`bash
npm run dev
\`\`\`

**আউটপুট হবে:**
\`\`\`
Server running on http://localhost:5000
MongoDB connected successfully
\`\`\`

---

## Frontend এবং Backend এর সংযোগ

### Backend থেকে Data পেতে (Frontend)
\`\`\`javascript
// বুক করতে চাই Frontend এ
const response = await fetch('http://localhost:5000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "ওয়েবসাইট তৈরি",
    budget: 50000
  })
});

const data = await response.json();
console.log(data);
\`\`\`

---

## টাইমলাইন এবং মাইলস্টোন

### সপ্তাহ ১-२: সেটআপ এবং Testing
- Backend সেটআপ করা
- Database স্ট্রাকচার তৈরি করা
- API টেস্টিং (Postman এ)

### সপ্তাহ ३-४: Frontend Integration
- Login/Register পেজ তৈরি
- Dashboard তৈরি
- প্রজেক্ট ম্যানেজমেন্ট পেজ

### সপ্তাহ ५-६: Additional Features
- Notification সিস্টেম
- Review/Rating সিস্টেম
- Payment Integration (Stripe)

---

## সাপোর্ট এবং সমস্যা সমাধান

### সাধারণ সমস্যা

**MongoDB Connection Error:**
\`\`\`
সমাধান: MongoDB আপনার কম্পিউটারে চলছে কিনা চেক করুন
mongod コマンド চালান
\`\`\`

**Port Already in Use:**
\`\`\`
সমাধান: অন্য একটি port ব্যবহার করুন
.env এ PORT=3001 সেট করুন
\`\`\`

**JWT Token Error:**
\`\`\`
সমাধান: আপনার token expire হয়েছে, নতুন করে login করুন
\`\`\`

---

## মূল ধারণাগুলি মনে রাখবেন

1. প্রতিটি API তে JWT Token প্রয়োজন (auth API ছাড়া)
2. প্রতিটি ইউজারের আলাদা Permission রয়েছে
3. প্রজেক্ট Status কখনো আগে যায় না (backward move নয়)
4. Client এবং Engineer একই সাথে একটি প্রজেক্টে থাকতে পারে না

---

## কমপ্লিট হয়েছে!

এই ডকুমেন্টেশন দিয়ে আপনার সম্পূর্ণ Backend সিস্টেম বুঝা যাবে। যদি কোনো প্রশ্ন থাকে তাহলে জিজ্ঞাসা করুন!

---

**Last Updated:** 2024-11-09
**Version:** 1.0
**Status:** Ready for Production
