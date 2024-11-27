# Role-Based Access Control (RBAC) UI

## Project Overview

The **Role-Based Access Control (RBAC)** is a responsive admin dashboard designed to manage users, roles, and permissions efficiently. It allows administrators to assign roles, define permissions, and oversee user activity with ease.

It a real-world RBAC system which can also extended to integrate with production use APIs.

---

## Key Features

1. **User Management**  
   - View and manage a list of users.  
   - Add, edit, and delete users.  
   - Assign roles to users and update their status (e.g., Active/Inactive).  

2. **Role Management**  
   - Create, edit, and delete roles.  
   - Assign permissions (e.g., Read, Write, Delete) to roles.

3. **Permission Management**  
   - View and modify permissions assigned to roles.  
   - Easily customize access levels through an intuitive interface.  

4. **Responsiveness**  
   - Optimized for desktop and mobile devices.  

5. **Mock API Integration**
   - Simulated CRUD operations for users and roles using JSON Server.  

---

## Screenshots

### Desktop View
![Desktop View](./assets/desktop.png)

### Mobile View
![Mobile View](./assets/mobile.png)

---

## Setup Instructions

Follow these steps to set up and run the project locally:

### Prerequisites
- **Node.js** (version 14 or later)
- **npm** 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kamalxdev/vrv-dashboard
   ```
2. Navigate to the project directory:
   ```bash
   cd vrv-dashboard
   ```
3. Install dependencies on client:
   ```bash
   cd client
   npm install
   ```
4. Install dependencies on server:
   ```bash
   cd server
   npm install
   ```
5. Set up environment variables for server and client:
   ```bash
   cp .env.example .env
   ```
6. Run the development server for both server and client:
   ```bash
   npm run dev
   ```

### Deployment

This client is hosted on [`vercel`](https://dashboard.kamalsingh.me/users) and the server is hosted on [`AWS`](https://api.dashboard.kamalsingh.me/api/v1/user)
