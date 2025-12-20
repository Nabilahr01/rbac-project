const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Server hidup');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
