import db from "../config/db.js"
import { countrySchema } from "../validations/validations.js"

async function findAll(req, res) {
    try {
        if (req.query.name_uz) {
            let [data] = await db.query("SELECT * FROM country WHERE name_uz = ?", [req.query.name_uz])
            return res.send(data)
        } else if (req.query.name_ru) {
            let [data] = await db.query("SELECT * FROM country WHERE name_ru = ?", [req.query.name_ru])
            return res.send(data)
        }
        let [data] = await db.query("SELECT * FROM country")
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.params
        let [data] = await db.query("SELECT * FROM country WHERE id = ?", [id])
        res.send(data[0])
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {
        let { error, value } = countrySchema.validate(req.body)
        if (error) {
            return res.send({ validateError: error.details[0].message });
        }
        let { name_uz, name_ru } = req.body
        let [newItem] = await db.query("INSERT INTO country (name_uz, name_ru) VALUES (?, ?)", [name_uz, name_ru])
        if (newItem.affectedRows == 0) {
            return res.status(400).send({ message: "not created ❌" })
        }
        let [item] = await db.query("SELECT * FROM country WHERE id = ?", [newItem.insertId])
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
        let updated = await db.query(`UPDATE country SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        await db.query("DELETE FROM country WHERE id = ?", [id])
        res.send({ message: "deleted ✅" })
    } catch (error) {
        console.log(error);
    }
};

export { findAll, findOne, create, update, remove }