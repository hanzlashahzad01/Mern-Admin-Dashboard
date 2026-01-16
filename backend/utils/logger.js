const Log = require('../models/Log');

const createLog = async (userId, userName, action, details, ipAddress) => {
    try {
        await Log.create({
            user: userId,
            userName,
            action,
            details,
            ipAddress,
        });
    } catch (error) {
        console.error('Logging Error:', error);
    }
};

module.exports = { createLog };
