# MERN Admin Dashboard

A professional, full-featured admin dashboard built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **Role-Based Access Control (RBAC)**
  - Admin: Full access to all features
  - Manager: Access to analytics and dashboard
  - User: Access to personal dashboard, settings, and notifications

- **User Management**
  - Create, edit, and delete users (Admin only)
  - View and manage user profiles
  - Toggle user status (active/inactive)

- **Authentication & Authorization**
  - Secure JWT-based authentication
  - Public signup for users
  - Fixed credentials for Admin and Manager
  - Password reset functionality

- **Analytics Dashboard**
  - Real-time statistics
  - User growth charts
  - Role distribution visualization
  - Activity logs

- **Settings & Profile**
  - Update profile information
  - Change password
  - Upload profile picture

## � Default Login Credentials

### Admin Account
- **Email:** `admin@gmail.com`
- **Password:** `adminpassword123`

### Manager Account
- **Email:** `manager@gmail.com`
- **Password:** `managerpassword123`

### User Account
- Users can sign up through the signup page
- After signup, users will have limited access

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/smart-admin-dashboard
JWT_SECRET=supersecretkey_dev_only_change_in_production
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## �️ Tech Stack

### Frontend
- React.js
- React Router
- TailwindCSS
- Recharts (for analytics)
- Lucide React (icons)
- React Hook Form + Yup (form validation)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## 📁 Project Structure

```
MERN-Admin-Dashboard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── uploads/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── index.html
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start the server
- `npm run dev` - Start server with nodemon (auto-restart)
- `npm run setup` - Setup admin and manager accounts
- `npm run test-login` - Test admin and manager login credentials
- `npm run check-users` - View all users in database
- `npm run fix-roles` - Fix admin and manager roles

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Role Permissions

| Feature | User | Manager | Admin |
|---------|------|---------|-------|
| Dashboard | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ✅ |
| Analytics | ❌ | ✅ | ✅ |
| User Management | ❌ | ❌ | ✅ |
| Activity Logs | ❌ | ❌ | ✅ |

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes on both frontend and backend
- Role-based authorization middleware
- Input validation with Yup
- Secure file upload handling

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:token` - Reset password

### Users (Admin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Analytics
- `GET /api/analytics/summary` - Get analytics summary

### Logs
- `GET /api/logs` - Get activity logs
- `GET /api/logs/export` - Export logs as CSV

## 🌟 Key Features Explained

### Signup & Login
- New users can sign up with their email and password
- All new signups are automatically assigned the "user" role
- Admin and Manager have fixed credentials (cannot signup)

### Role-Based Dashboard
- **Users** see a personalized welcome dashboard
- **Managers** see analytics and system statistics
- **Admins** see full analytics, user management, and logs

### User Management (Admin Only)
- Create, edit, and delete users
- Change user roles
- Toggle user status (active/inactive)
- View user profiles and activity

## 🐛 Troubleshooting

### Manager Login Issue
If the manager login is not working, follow these steps:

**Step 1: Setup Accounts (Recommended)**
```bash
cd backend
npm run setup
```
This will create/update both admin and manager accounts with correct credentials.

**Step 2: Verify Login Credentials**
```bash
npm run test-login
```

**Step 3: Clear Browser Cache**
- Clear your browser's local storage
- Or use Incognito/Private mode
- Press F12 → Application → Local Storage → Clear All

**Step 4: Try Login Again**
- Email: `manager@gmail.com`
- Password: `managerpassword123`

### Fix All Roles
If you need to fix admin and manager roles:
```bash
cd backend
npm run fix-roles
```

### Check All Users
To see all users in the database:
```bash
cd backend
npm run check-users
```

### Database Connection
Make sure MongoDB is running on your system or update the `MONGO_URI` in `.env` to point to your MongoDB Atlas cluster.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Hanzla Shahzad
- GitHub: [@hanzlashahzad01](https://github.com/hanzlashahzad01)

---

**Note:** Remember to change the default admin and manager passwords in production!
