# StudyTrack 📚

**StudyTrack** is a full-stack task management web application designed to help students organize their academic tasks, manage assignments, and track their progress in one place.

## ✨ Features

- **User Authentication:** Secure login and signup using JWT-based authentication and password hashing.
- **Dashboard:** View total, pending, and completed task statistics.
- **Task Management:** Create, view, edit, and delete tasks.
- **Task Completion Tracking:** Mark tasks as completed and track their status.
- **Priority Management:** Organize tasks by priority.
- **Task Search:** Search for tasks from the task listing page.
- **Responsive UI:** A clean interface styled with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Axios
- React Router
- React Icons

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## 📁 Project Structure

```text
StudyTrack2/
├── client/
│   └── src/
│       └── components/
│           ├── Home.jsx
│           ├── ShowTask.jsx
│           ├── AddTask.jsx
│           ├── EditTask.jsx
│           ├── Login.jsx
│           └── Signin.jsx
└── server/
    ├── controller/
    ├── middleware/
    ├── models/
    ├── router/
    └── index.js
```

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- Git

### 1. Clone the repository

```bash
git clone https://github.com/soumyakhare001/task-management-system
cd StudyTrack2
```

### 2. Install dependencies

Install the frontend dependencies:

```bash
cd client
npm install
```

Install the backend dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the server directory and configure the environment variables required by your backend.

Example:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact variable names expected by your backend code. Never commit your `.env` file or expose your database credentials or JWT secret.

### 4. Run the application

Start the backend using the script configured in `server/package.json`. For example, if your project uses a `dev` script:

```bash
npm run dev
```

Then open a separate terminal and start the frontend using the script configured in `client/package.json`.

```bash
cd client
npm run dev
```

Open the local URL displayed by the frontend development server.

## 🔐 Security

- Authentication-protected API routes.
- Password hashing with bcrypt.
- JWT-based authentication.
- Environment variables for sensitive configuration.

## 🎯 Project Goal

StudyTrack was built to practice full-stack web development, REST API integration, authentication, database operations, and building a practical application with React and Node.js.

## 👩‍💻 Author

**Soumya Khare**

MCA Student | Aspiring Software Engineer

- GitHub: https://github.com/soumyakhare001
- LinkedIn: (https://www.linkedin.com/soumya-khare-4a1b2c)

---

Built with 💜 to make academic task management simpler.
