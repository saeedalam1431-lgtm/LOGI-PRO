const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. Get All Exports
router.get('/all', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM export_entries ORDER BY id DESC");
        res.json(rows);
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    }
});

// 2. Add New Export
router.post('/add', async (req, res) => {
    // --- YEH HISSA DATA CHECK KARNE K LIYE HAI ---
    console.log("------------------------------------");
    console.log("🚀 NAYA DATA RECIEVED:", req.body); 
    console.log("------------------------------------");

    const { 
        date, party, gd_number, container_number, shipping_line, 
        bl_number, total_bill, paid, method, payable 
    } = req.body;

    const sql = `INSERT INTO export_entries 
        (date, party, gd_number, container_number, shipping_line, bl_number, total_bill, paid, method, payable) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        await db.query(sql, [date, party, gd_number, container_number, shipping_line, bl_number, total_bill, paid, method, payable]);
        res.json({ success: true, message: "LogiPro: Export Data Saved!" });
    } catch (err) { 
        console.error("❌ DATABASE SAVE ERROR:", err.message); // Error bhi CMD mein dikhega
        res.status(500).json({ success: false, error: "Database Error!" }); 
    }
});

// 3. Update Existing Export
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    
    // Edit karte waqt bhi check karein kya data aa raha hai
    console.log(`📝 UPDATING ID ${id} WITH:`, req.body);

    const { 
        date, party, gd_number, container_number, shipping_line, 
        bl_number, total_bill, paid, method, payable 
    } = req.body;

    const sql = `UPDATE export_entries SET 
        date=?, party=?, gd_number=?, container_number=?, shipping_line=?, 
        bl_number=?, total_bill=?, paid=?, method=?, payable=? 
        WHERE id=?`;

    try {
        await db.query(sql, [date, party, gd_number, container_number, shipping_line, bl_number, total_bill, paid, method, payable, id]);
        res.json({ success: true, message: "Export Updated Successfully!" });
    } catch (err) {
        console.error("❌ UPDATE ERROR:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. Delete Export
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`🗑️ DELETING ID: ${id}`);
    
    try {
        await db.query('DELETE FROM export_entries WHERE id = ?', [id]);
        res.json({ success: true, message: "Entry deleted successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;