app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
app.use(cors());

const role = localStorage.getItem("role");

if (role !== "Admin") {
  document.querySelectorAll(".admin-only").forEach(e => e.style.display = "none");
}
