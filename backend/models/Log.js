const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userName: String,
        action: {
            type: String,
            required: true,
            enum: ['Login', 'Logout', 'Create User', 'Update User', 'Delete User', 'Update Settings', 'Login Attempt Failed'],
        },
        details: String,
        ipAddress: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Log', logSchema);
