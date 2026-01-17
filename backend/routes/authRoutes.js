const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, upload.single('profileImage'), updateProfile);

module.exports = router;
