const router = require("express").Router();

const Listings = require("./listings-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkRole("user"), (req, res) => {
    Listings.find()
        .then(listings => {
            res.status(200).json({ listings, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

function checkRole(role) {
    return function (req, res, next) {
        if (req.jwt.role === role) {
            next();
        } else {
            res.status(403).json({ message: "you have no access" });
        }
    };
}

module.exports = router;