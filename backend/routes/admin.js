const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('ADMIN ROUTE DIPANGGIL');
  res.json({ ok: true });
});

router.get('/', auth, rbac(['Admin']), (req, res) => {
  res.json({
    message: 'Akses admin berhasil',
    user: req.user
  });
});

router.get('/employees', auth, rbac(['Admin']), (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit === 'all' ? null : 10;
  const offset = (page - 1) * 10;

  let sql = 'SELECT id, name, department, status FROM employees';
  if (limit) {
    sql += ' LIMIT ? OFFSET ?';
  }

  const params = limit ? [limit, offset] : [];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Query error' });
    }
    res.json(result);
  });
});

module.exports = router;
