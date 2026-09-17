const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {

    try {

        const { name, email, username, password } = req.body;

        // Check fields
        if (!name || !email || !username || !password) {

            return res.status(400).json({
                message: "Please fill in all fields"
            });
        }

        // Check username
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {

            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // Check email
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {

            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Create user

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            username,
            password:hashedPassword
        });

        // Save user
        await user.save();

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const signin = async (req, res) => {

    try {

        const { username, password } = req.body;

        // Check fields
        if (!username || !password) {

            return res.status(400).json({
                message: "Please fill in all fields"
            });
        }

        // Find user
        const user = await User.findOne({ username });

        if (!user) {

            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

    const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
);


if (!isPasswordCorrect) {
    return res.status(401).json({
        message: "Invalid username or password"
    });
}

        // Login successful
        res.status(200).json({
            message: "Sign in successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = { signup , signin};