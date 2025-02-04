import db from "../config/db.js"

async function findAll(req, res) {
    try {
        let [data] = await db.query("SELECT * FROM category")
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.params
        let [data] = await db.query("SELECT * FROM category WHERE id = ?", [id])
        res.send(data[0])
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {
        let { name_uz, name_ru, image } = req.body
        let [newItem] = await db.query("INSERT INTO category (name_uz, name_ru, image) VALUES (?, ?, ?)", [name_uz, name_ru, image])
        if (newItem.affectedRows == 0) {
            res.status(400).send({ message: "not created ❌" })
            return
        }
        let [item] = await db.query("SELECT * FROM category WHERE id = ?", [newItem.insertId])
        res.json(item[0])
    } catch (error) {
        console.log(error);
    }
};
async function update(req, res) {
    try {
        let { id } = req.params
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let queryKey = keys.map(k += " = ?")
        let updated = await db.query(`UPDATE category SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        await db.query("DELETE FROM category WHERE id = ?", [id])
        res.send({ message: "deleted ✅" })
    } catch (error) {
        console.log(error);
    }
};

export { findAll, findOne, create, update, remove }