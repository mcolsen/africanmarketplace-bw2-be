const db = require("../database/connection.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByUsername,
    addProfile,
    findProfileById
};

function find() {
    return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
    return db("users as u")
        .join("roles as r", "u.role", "r.id")
        .where({filter})
        .select("u.id", "u.username", "u.password", "r.name as role")
        .orderBy("u.id");
}

function findByUsername(username) {
    return db("users")
        .where({username})
    
}

async function addProfile(user_id, profile){
    try {
        const [id] = await db("profile").insert({...profile, user_id});

        return findProfileById(id);
    } catch (error) {
        throw error;
    }
}

async function add(user, role="user") {
    try {
        const [id] = await db("users").insert({...user, role}, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("users").where({ id }).first();
}

function findProfileById(id) {
    return db("profile").where({ id }).first();
}