const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const [rows] = await db.query(`
      SELECT u.id, u.username, u.password_hash, r.role_name
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE u.username = ?
    `, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    const user = rows[0];

    // sementara, lewati bcrypt dulu jika belum
    // nanti diganti bcrypt.compare(password, user.password_hash)

    const token = jwt.sign(
      { id: user.id, role: user.role_name },
      'SECRET_KEY',
      { expiresIn: '1h' }
    );

    return res.json({ token });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
