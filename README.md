# DTube: Video Streaming Platform
<p align="center">
    <img width="200" height="200" alt="logo" src="https://github.com/user-attachments/assets/1836e0bf-ddf9-46e1-9b72-e07cd4db5753" />
</p>


## System Architecture

DTube is an application built with React for the frontend and Express.js for the backend middleware. It uses MongoDB for the database and Amazon S3 for video and image storage. Secure user authentication is handled using JSON Web Tokens (JWT) and bcrypt.

## Database Schema

The application relies on four primary data models:

### User
Stores profile credentials (username, user_handle, user_role, email, password) and engagement data (liked_videos, watched_videos, subscribers, subscribed_to).

### Video
Stores media metadata including title, description, thumbnail, duration, and engagement metrics (view_count, like_count, comment_count).

### Playlist
Stores the custom name of the playlist, the creator's reference, and an array of linked videos.

### Comment
Stores the text content, author, associated video_id, and threading data for replies (parent_comment_id, reply_count, likes).

## Authentication Flow:

DTube implements a secure authentication system utilizing JSON Web Tokens (JWT) and bcrypt for password hashing.  

### User Registration
The signup endpoint validates user input (including email format), ensures the email or handle isn't already taken, securely hashes passwords using bcrypt, and auto-generates a dynamic profile avatar using the user's name.  

### User Login
The login route verifies the email and password, then generates a JWT with a 7-day expiration that is sent to the client to authorize future requests.  

### Password Recovery
- Request Reset: The /forgot-password route verifies the user's email, generates a temporary 15-minute JWT, and sends a styled HTML email with a unique reset link using Nodemailer.
- Update Password: The /reset-password/:token route captures the token from the URL, verifies it hasn't expired, and securely hashes and saves the new password to the database. 

## Local Setup Instructions

Follow these steps to run DTube on your local machine for testing and development.

### Prerequisites
* **Node.js** (v18 or higher)
* **MongoDB Compass** (for local database management)
* **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/SaiPrasad-Raut-007/DTube.git
cd dtube
```
### 2. Environment Variables
Create a `.env` file in the root directory of the project. You can use the provided `.env.example` as a template.

```bash
cp .env.example .env
```
Make sure to fill in the required values for your MongoDB connection string, JWT secret, AWS S3 keys, and Nodemailer email credentials.
### 3. Database Setup (Seeding)
To test the application with pre-existing dummy data:

1. Open MongoDB Compass and connect to your local instance (usually `mongodb://localhost:27017`).
2. Create a new database named `dtube`.
3. Create four collections: `users`, `videos`, `playlists`, and `comments`.
4. Click into each collection, select Add Data -> Import JSON or CSV file, and import the corresponding JSON file found in the `db_seed` folder of this repository.

### 4. Install Dependencies
You need to install the Node modules for both the backend (root folder) and the frontend.

```Bash
# Install backend dependencies in the root folder
npm install

# Navigate to the frontend folder and install frontend dependencies
cd frontend
npm install
```
### 5. Run the Application
You will need two separate terminal windows to run both servers simultaneously.

Terminal 1: Start the Backend Server
Ensure you are in the root folder of the project.

```Bash
npm run dev
```
Terminal 2: Start the Frontend Server
Open a new terminal, navigate to the frontend folder, and start Vite.

```Bash
cd frontend
npm run dev
```
The application should now be running! Open your browser and navigate to the local host link provided in your frontend terminal (usually `http://localhost:5173`).

## Application Walkthrough & Usage

### Login & Registration


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133218" src="https://github.com/user-attachments/assets/50e5c350-306f-4ec1-9415-82c3bc047f85" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133215" src="https://github.com/user-attachments/assets/aeb4f509-2ac1-4f04-9a1c-a53cf1022215" />

---
### Forgot Password


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133224" src="https://github.com/user-attachments/assets/553187ce-b6ca-4acd-ba1a-af50e46ad1d4" />

---
### Home Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133017" src="https://github.com/user-attachments/assets/6514da23-273d-4be7-8cc4-41c5516ca606" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133148" src="https://github.com/user-attachments/assets/ff72947d-e386-448e-9db4-6183ee791783" />

---
### Settings Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133427" src="https://github.com/user-attachments/assets/87c6bc98-b4b7-4cbd-9e97-e2009d2ca7cd" />

---
### DTube Studio


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133555" src="https://github.com/user-attachments/assets/944f86ef-8933-426f-a166-2dc653c1904a" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133721" src="https://github.com/user-attachments/assets/1fab42b4-2c9a-4399-a19e-128bd38af5b9" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133727" src="https://github.com/user-attachments/assets/0e5232bd-5328-40be-9133-6568a5f36dc5" />

---
### Channel Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133339" src="https://github.com/user-attachments/assets/74e15887-6bbe-453a-918f-7ec9b29427eb" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133345" src="https://github.com/user-attachments/assets/69a0faa5-53f9-4733-9c0a-89302887fcf8" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133350" src="https://github.com/user-attachments/assets/93b7d417-b934-4207-b149-4e1498b9d777" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133355" src="https://github.com/user-attachments/assets/c5530e94-d56b-4d4b-a5d4-031cd5626ae7" />

---
### Trending Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133328" src="https://github.com/user-attachments/assets/34291b82-c81f-49e4-adab-c55aaefa616d" />

---
### Video Player Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133813" src="https://github.com/user-attachments/assets/28a04289-45ec-49c8-b5e4-d035f724a590" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133833" src="https://github.com/user-attachments/assets/456a3fb1-0941-4249-81af-9fdc537e94e8" />

---
### Subscriptions Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133315" src="https://github.com/user-attachments/assets/c7bec836-c193-4eea-8c85-25ac76df99c1" />

---

### Library Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133236" src="https://github.com/user-attachments/assets/0da3937d-c496-4364-9390-a2b6f690ef94" />
<img width="1920" height="1032" alt="Screenshot 2026-07-04 133243" src="https://github.com/user-attachments/assets/545beb95-21ee-471d-9bad-d99288cc9516" />

### Playlist Page


<img width="1920" height="1032" alt="Screenshot 2026-07-04 133412" src="https://github.com/user-attachments/assets/83c58774-2534-4151-b594-7beab6ed51c9" />
