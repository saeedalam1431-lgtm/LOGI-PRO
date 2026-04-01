const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Humne Step 2 mein jo db.js banai thi

// 1. Add New Import
router.post('/add', async (req, res) => {
    const { date, party, gd, container, line, bl, bill, paid, method, payable } = req.body;
    
    const sql = `INSERT INTO import_entries 
    (date, party, gd_number, container_number, shipping_line, bl_number, total_bill, paid, method, payable) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    try {
        await db.query(sql, [date, party, gd, container, line, bl, bill, paid, method, payable]);
        res.json({ success: true, message: "Import Data Cloud par save ho gaya!" });
    } catch (err) {
        console.error("❌ Insert Error:", err);
        res.status(500).json({ success: false, error: "Database Error!" });
    }
});

// 2. Get All Imports
router.get('/all', async (req, res) => {
    const sql = "SELECT * FROM import_entries ORDER BY id DESC";
    try {
        const [results] = await db.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. Delete Import
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM import_entries WHERE id = ?', [id]);
        res.json({ success: true, message: "Entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;