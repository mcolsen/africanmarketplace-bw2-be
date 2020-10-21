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
    return db("listings").select(
        "id",
         "item",
         "description",
         "price",
         "amount",
         "location"
         )
         .orderBy("id");
}

async function add(listing, profile_id) {
    try {
        const [id] = await db("listings").insert({...listing, profile_id}, "id");
        return findById(id);
    } catch (error) {
        throw error;
    }
}

async function change(listing, listing_id) {
    try {
        const [id] = await db("listings").modify({...listing, listing_id}, "id");
        return findById(id);
    } catch (error) {
        throw error;
    }
}

async function remove(id) {
    try {
        await db("listings").delete(id);
        return {success: "Listing removed successfully."}
    } catch (error) {
        throw error;
    }
}

function findBy(filter) {
    return db("listings as l")
        .where(filter)
        .select(
            "l.id",
            "l.item",
            "l.description",
            "l.price",
            "l.amount",
            "l.location"
            )
        .orderBy("l.id");
}

function findById(id) {
    return db("listings").where({ id }).first();
}