const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const setupAdminAndManager = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Setup Admin
        console.log('=== Setting up Admin Account ===');
        let admin = await User.findOne({ email: 'admin@gmail.com' });

        if (admin) {
            console.log('Admin exists, updating...');
            admin.name = 'System Admin';
            admin.role = 'admin';
            admin.status = 'active';
            admin.password = 'adminpassword123';
            await admin.save();
            console.log('✅ Admin updated successfully');
        } else {
            console.log('Creating new admin...');
            admin = await User.create({
                name: 'System Admin',
                email: 'admin@gmail.com',
                password: 'adminpassword123',
                role: 'admin',
                status: 'active'
            });
            console.log('✅ Admin created successfully');
        }

        // Setup Manager
        console.log('\n=== Setting up Manager Account ===');
        let manager = await User.findOne({ email: 'manager@gmail.com' });

        if (manager) {
            console.log('Manager exists, updating...');
            manager.name = 'System Manager';
            manager.role = 'manager';
            manager.status = 'active';
            manager.password = 'managerpassword123';
            await manager.save();
            console.log('✅ Manager updated successfully');
        } else {
            console.log('Creating new manager...');
            manager = await User.create({
                name: 'System Manager',
                email: 'manager@gmail.com',
                password: 'managerpassword123',
                role: 'manager',
                status: 'active'
            });
            console.log('✅ Manager created successfully');
        }

        // Verify both accounts
        console.log('\n=== Verification ===');

        const adminTest = await User.findOne({ email: 'admin@gmail.com' });
        const adminPasswordOk = await adminTest.matchPassword('adminpassword123');
        console.log(`Admin - Email: ${adminTest.email}, Role: ${adminTest.role}, Password: ${adminPasswordOk ? '✅' : '❌'}`);

        const managerTest = await User.findOne({ email: 'manager@gmail.com' });
        const managerPasswordOk = await managerTest.matchPassword('managerpassword123');
        console.log(`Manager - Email: ${managerTest.email}, Role: ${managerTest.role}, Password: ${managerPasswordOk ? '✅' : '❌'}`);

        console.log('\n=== Setup Complete! ===');
        console.log('\nLogin Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin:');
        console.log('  Email: admin@gmail.com');
        console.log('  Password: adminpassword123');
        console.log('\nManager:');
        console.log('  Email: manager@gmail.com');
        console.log('  Password: managerpassword123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

setupAdminAndManager();
