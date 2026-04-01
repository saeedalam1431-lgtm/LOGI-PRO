const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Spelling check karein: imports (s ke sath)
const importRoutes = require('./routes/imports'); 
const exportRoutes = require('./routes/export');

app.use('/api/import', importRoutes);
app.use('/api/export', exportRoutes);

app.listen(3000, () => console.log("🚀 Server Running on Port 3000"));