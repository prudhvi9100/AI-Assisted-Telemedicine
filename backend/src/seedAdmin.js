const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const User = require(path.join(__dirname, 'models', 'User.js'));
const connectDB = require(path.join(__dirname, 'config', 'db.js'));

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Connect to DB
connectDB();

const importData = async () => {
    try {
        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@healthconnect.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create Admin User
        await User.create({
            name: 'Super Admin',
            email: 'admin@healthconnect.com',
            password: 'adminpassword123', // Will be hashed by pre-save hook
            role: 'admin'
        });

        console.log('Admin User Created Successfully! 🛡️');
        console.log('Email: admin@healthconnect.com');
        console.log('Password: adminpassword123');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

importData();
