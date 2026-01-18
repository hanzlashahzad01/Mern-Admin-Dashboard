const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkUsers = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find all users
        const users = await User.find({}).select('-password');
        console.log('\n=== All Users in Database ===');
        users.forEach(user => {
            console.log(`\nName: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
            console.log(`Status: ${user.status}`);
            console.log(`ID: ${user._id}`);
        });

        // Check specifically for manager
        const manager = await User.findOne({ email: 'manager@gmail.com' });
        console.log('\n=== Manager User Details ===');
        if (manager) {
            console.log('Manager found!');
            console.log(`Name: ${manager.name}`);
            console.log(`Email: ${manager.email}`);
            console.log(`Role: ${manager.role}`);
            console.log(`Status: ${manager.status}`);
        } else {
            console.log('Manager NOT found in database!');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
