const jwt = require('jsonwebtoken');

const authAdmin = (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { email: process.env.ADMIN_EMAIL },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.json({
            email,
            token,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = {
    authAdmin,
};
