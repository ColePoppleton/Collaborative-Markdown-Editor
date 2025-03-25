# Collaborative Markdown Editor

A real-time collaborative markdown editor built with Vue.js, Node.js, Socket.IO, and SQLite.

## Overview

This project implements a collaborative markdown editor that allows multiple users to edit the same document simultaneously. It features user authentication, basic formatting options, and real-time synchronization of changes.

## Features

*   **Real-time Collaboration:** Multiple users can edit the same document concurrently. Changes are synchronized in real-time using Socket.IO.
*   **User Authentication:** Users can register and log in using a secure authentication system.
*   **Basic Formatting:** The editor provides basic formatting options, such as bold, italic, and headings.
*   **Markdown Support:** The editor supports Markdown syntax, allowing users to format their text using familiar Markdown conventions.
*   **SQLite Database:** User data is stored in a lightweight SQLite database.

## Technologies

*   **Frontend:**
    *   Vue.js
    *   Vue Router
    *   Vuex
    *   TipTap (Markdown editor component)
    *   Socket.IO Client
    *   Axios
*   **Backend:**
    *   Node.js
    *   Express.js
    *   Socket.IO Server
    *   SQLite3
    *   bcryptjs
    *   jsonwebtoken
    *   cors

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd collaborative-markdown-editor
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    ```

4.  **Configure the backend:**

    *   Ensure that SQLite is installed on your system.
    *   The SQLite database file (`database.db`) will be created in the `backend` directory when the server starts.

5.  **Start the backend server:**

    ```bash
    cd backend
    npm start  # or node server.js, pm2 start server.js --watch
    ```

6.  **Start the frontend development server:**

    ```bash
    cd frontend
    npm run serve
    ```

7.  **Access the application:**

    *   Open your browser and navigate to `http://localhost:5173` (or the appropriate URL for your frontend development server).

[GNU License](LICENSE)
