const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Connected to SQLite database.');
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

app.set('db', db);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('documentChange', (data) => {
        socket.broadcast.emit('documentUpdate', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});