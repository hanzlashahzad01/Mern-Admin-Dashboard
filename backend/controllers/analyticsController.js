const User = require('../models/User');
const Log = require('../models/Log');

// @desc    Get analytics summary
// @route   GET /api/analytics/summary
// @access  Private
const getAnalyticsSummary = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });

        // Role distribution for Pie Chart
        const roleStats = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        // Simple Monthly Growth (mocking data since we don't have historical snapshots yet, 
        // but in real app we'd group by createdAt)
        const monthlyGrowth = [
            { month: 'Jan', count: 400 },
            { month: 'Feb', count: 300 },
            { month: 'Mar', count: 200 },
            { month: 'Apr', count: 278 },
            { month: 'May', count: 189 },
            { month: 'Jun', count: 239 },
        ];

        // Recent Logs for Dashboard
        const recentLogs = await Log.find({}).sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            activeUsers,
            roleStats: roleStats.map(stat => ({ name: stat._id, value: stat.count })),
            monthlyGrowth,
            recentLogs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAnalyticsSummary };
