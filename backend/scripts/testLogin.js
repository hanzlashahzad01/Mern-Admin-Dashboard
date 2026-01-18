const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const testLogin = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB\n');

        // Test credentials
        const testAccounts = [
            { email: 'admin@gmail.com', password: 'adminpassword123', expectedRole: 'admin' },
            { email: 'manager@gmail.com', password: 'managerpassword123', expectedRole: 'manager' }
        ];

        for (const account of testAccounts) {
            console.log(`\n=== Testing ${account.email} ===`);

            // Find user
            const user = await User.findOne({ email: account.email });

            if (!user) {
                console.log(`❌ User not found!`);
                continue;
            }

            console.log(`✅ User found`);
            console.log(`   Name: ${user.name}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Status: ${user.status}`);

            // Test password
            const isPasswordCorrect = await user.matchPassword(account.password);
            console.log(`   Password test: ${isPasswordCorrect ? '✅ CORRECT' : '❌ WRONG'}`);

            // Verify role
            const isRoleCorrect = user.role === account.expectedRole;
            console.log(`   Role verification: ${isRoleCorrect ? '✅ CORRECT' : '❌ WRONG (Expected: ' + account.expectedRole + ', Got: ' + user.role + ')'}`);

            if (isPasswordCorrect && isRoleCorrect) {
                console.log(`\n✅ ${account.email} can login successfully!`);
            } else {
                console.log(`\n❌ ${account.email} login will FAIL!`);
            }
        }

        console.log('\n=== Summary ===');
        console.log('Admin credentials: admin@gmail.com / adminpassword123');
        console.log('Manager credentials: manager@gmail.com / managerpassword123');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

testLogin();
