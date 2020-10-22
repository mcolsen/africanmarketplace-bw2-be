const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken"); // npm i this package

const router = require("express").Router();
const config = require("../api/config.js");

const Profile = require("../profiles/profile-model");
const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;
        let {username, password, ...rest} = credentials
        // save the user to the database
        Users.add({username, password})
            .then(user => {
                // res.status(201).json({ data: user });
                Users.addProfile(user.id, rest)
                    .then(profile => {
                        const token = getJwt(user);
                        res.status(201).json({data: {user, profile}, token})
                    })
                    .catch(error => {
                        res.status(500).json({message: error.message});
                    })
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (isValid(req.body)) {
        Users.findByUsername(username)
            .then(([user]) => {
                // compare the password the hash stored in the database
                console.log(user);
                if (bcryptjs.compareSync(password, user.password)) {
                    
                    Profile.findByUserId(user.id)
                        .then(profile => {
                            const token = getJwt(user);
                            res.status(200).json({data: {user, profile}, token})
                        })
                } else {
                    console.log("user.password", username, "password", password)
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    }
});

function getJwt(user) {
    const payload = {
        username: user.username,
        role: user.role,
    };

    const jwtOptions = {
        expiresIn: "8h",
    };

    return jwt.sign(payload, config.jwtSecret, jwtOptions);
}

module.exports = router;