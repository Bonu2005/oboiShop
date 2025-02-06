import db from "../config/db.js"
import { categoryItemSchema } from "../validations/validations.js";

async function findAll(req, res) {
    try {
        let [data] = await db.query("SELECT * FROM categoryItem")
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.params
        let [data] = await db.query("SELECT * FROM categoryItem WHERE id = ?", [id])
        res.send(data[0])
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {
        let { error, value } = categoryItemSchema.validate(req.body)
        if (error) {
            return res.send({ validateError: error.details[0].message });
        }
        let { category_id, product_id } = req.body
        let [newItem] = await db.query("INSERT INTO categoryItem (category_id, product_id) VALUES (?, ?)", [category_id, product_id])
        if (newItem.affectedRows == 0) {
            return res.status(400).send({ message: "not created ❌" })
        }
        let [item] = await db.query("SELECT * FROM categoryItem WHERE id = ?", [newItem.insertId])
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
        let queryKey = keys.map((k)=>k += " = ?")
        let updated = await db.query(`UPDATE categoryItem SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        await db.query("DELETE FROM categoryItem WHERE id = ?", [id])
        res.send({ message: "deleted ✅" })
    } catch (error) {
        console.log(error);
    }
};

export { findAll, findOne, create, update, remove }