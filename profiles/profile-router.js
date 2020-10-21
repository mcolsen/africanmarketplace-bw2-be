const router = require("express").Router();

const Users = require("../users/users-model.js");
const Profiles = require("./profile-model");
const Listings = require("../listings/listings-model");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, checkRole("user"), (req, res) => {
    Profiles.find()
        .then(profiles => {
            res.status(200).json({ profiles, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

router.get("/:id/", restricted, checkRole("user"), (req, res) => {
    Profiles.findById(req.params.id)
        .then(profile => {
            res.status(200).json({profile, jwt: req.jwt});
        })
        .catch(err => res.send(err));
})

router.put("/:id/", restricted, checkRole("user"), (req, res) => {
    Profiles.change(profile, req.params.id)
        .then(profile => {
            res.status(200).json({profile, jwt: req.jwt});
        })
        .catch(err => res.send(err));
})

router.get("/:id/listings", restricted, checkRole("user"), (req, res) => {
    Listings.findAllByProfileId(req.params.id)
        .then(listings => {
            res.status(200).json({ listings, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

router.post("/:id/listings", restricted, checkRole("user"), (req, res) => {
    Listings.add(req.body, req.params.id)
        .then(listing => {
            res.status(201).json({data: listing, jwt: req.jwt});
        })
        .catch(err => res.send(err));
});

router.delete("/:id/listings/:listid", restricted, checkRole("user"), (req, res) => {
    Listings.remove(req.params.listid)
        .then(listing => {
            res.status(200).json({data: listing, jwt: req.jwt});
        })
        .catch(err => res.send(err));
});

router.put("/:id/listings/:listid", restricted, checkRole("user"), (req, res) => {
    Listings.change(req.body, req.params.listid)
        .then(listing => {
            res.status(200).json({data: listing, jwt: req.jwt});
        })
        .catch(err => {res.send(err)});
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

// write the checkRole() function to only allow access
// if the role in the token matches the role passed as an argument to the checkRole function
module.exports = router;