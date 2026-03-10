# ChatUsingWebsockets

A real-time group chat application built with React.js and Socket.IO.

## Features

- **Real-time Messaging:** Send and receive messages instantly in a shared group chat.
- **Join Notifications:** Automatically alerts the group when a new user joins the room.
- **Typing Indicators:** Displays a "User is typing..." message, utilizing debouncing to clear the indicator when a user stops typing.

## Tech Stack

- **Frontend:** React.js (via Vite), Tailwind CSS, `socket.io-client`.
- **Backend:** Node.js, Express.js, `socket.io`.

## How to Run

**1. Start the Backend Server:**

- Open a terminal and navigate to the `/server` directory.
- Run `npm install` to install backend dependencies.
- Run `node server.js` to start the server (listens on port 4600).

**2. Start the Frontend Application:**

- Open a new terminal and navigate to your frontend `/app` directory.
- Run `npm install` to install frontend dependencies.
- Start the React development server (e.g., `npm run dev`).
