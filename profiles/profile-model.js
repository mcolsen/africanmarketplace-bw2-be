const db = require("../database/connection.js");

module.exports = {
    add,
    change,
    find,
    findBy,
    findById,
    remove,
};

function find() {
    return db("profile").select(
        "id",
         "user_id",
         "email",
         "business"
         )
         .orderBy("id");
}

async function add(profile, user_id) {
    try {
        const [id] = await db("profile").insert({...profile, user_id}, "id");
        return findById(id);
    } catch (error) {
        throw error;
    }
}

async function change(profile, user_id) {
    try {
        const [id] = await db("profile").modify({...profile, user_id}, "id");
        return findById(id);
    } catch (error) {
        throw error;
    }
}

async function remove(id) {
    try {
        await db("profile").delete(id);
        return {success: "Profile removed successfully."}
    } catch (error) {
        throw error;
    }
}

function findBy(filter) {
    return db("profile as p")
        .where(filter)
        .select(
            "p.id",
            "p.user_id",
            "p.first_name",
            "p.last_name",
            "p.business"
        )
        .orderBy("p.id");
}

function findByUserID(user_id){
    return db("profile").where({user_id}).first();
}
function findById(id) {
    return db("profile").where({ id }).first();
}