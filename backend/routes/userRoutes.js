const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = req.app.get('db');

        db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Registration failed' });
            }

            if (row) {
                return res.status(400).json({ message: 'User already exists' });
            }

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: 'Registration failed' });
                }

                db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).json({ message: 'Registration failed' });
                    }

                    res.status(201).json({ message: 'User registered successfully' });
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = req.app.get('db');

        db.get(`SELECT id, username, password FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Login failed' });
            }

            if (!row) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            bcrypt.compare(password, row.password, (err, isPasswordValid) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ message: 'Login failed' });
                }

                if (!isPasswordValid) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const token = jwt.sign({ id: row.id, username: row.username }, 'your-secret-key', { expiresIn: '1h' });

                res.json({ token });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
});

module.exports = router;