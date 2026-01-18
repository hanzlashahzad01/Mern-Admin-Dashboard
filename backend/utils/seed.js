const User = require('../models/User');

const seedUsers = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@gmail.com' });
        if (!adminExists) {
            await User.create({
                name: 'System Admin',
                email: 'admin@gmail.com',
                password: 'adminpassword123',
                role: 'admin',
                status: 'active'
            });
            console.log('Admin user seeded');
        }

        // Check if manager exists
        const managerExists = await User.findOne({ email: 'manager@gmail.com' });
        if (!managerExists) {
            await User.create({
                name: 'System Manager',
                email: 'manager@gmail.com',
                password: 'managerpassword123',
                role: 'manager',
                status: 'active'
            });
            console.log('Manager user seeded');
        }
    } catch (error) {
        console.error('Error seeding users:', error.message);
    }
};

module.exports = seedUsers;
