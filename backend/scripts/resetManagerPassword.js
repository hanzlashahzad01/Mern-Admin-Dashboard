const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const resetManagerPassword = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Find manager
        const manager = await User.findOne({ email: 'manager@gmail.com' });

        if (!manager) {
            console.log('Manager not found! Creating new manager...');

            // Create new manager
            const newManager = await User.create({
                name: 'System Manager',
                email: 'manager@gmail.com',
                password: 'managerpassword123',
                role: 'manager',
                status: 'active'
            });

            console.log('✅ New Manager created successfully!');
            console.log(`Email: ${newManager.email}`);
            console.log(`Password: managerpassword123`);
            console.log(`Role: ${newManager.role}`);
        } else {
            console.log('Manager found! Resetting password...');

            // Update manager password directly
            manager.password = 'managerpassword123';
            await manager.save();

            console.log('✅ Manager password reset successfully!');
            console.log(`Email: ${manager.email}`);
            console.log(`Password: managerpassword123`);
            console.log(`Role: ${manager.role}`);
        }

        // Verify the password works
        const testManager = await User.findOne({ email: 'manager@gmail.com' });
        const isPasswordCorrect = await testManager.matchPassword('managerpassword123');

        console.log('\n=== Password Verification ===');
        console.log(`Password test: ${isPasswordCorrect ? '✅ PASSED' : '❌ FAILED'}`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

resetManagerPassword();
