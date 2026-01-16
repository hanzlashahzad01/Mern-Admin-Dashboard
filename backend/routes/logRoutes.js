const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('superadmin', 'admin'), async (req, res) => {
    const logs = await Log.find({}).sort({ createdAt: -1 }).limit(100);
    res.json(logs);
});

module.exports = router;
