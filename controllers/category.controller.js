import db from "../config/db.js"
import { categorySchema } from "../validations/validations.js"
import { promises as fs } from "fs"

async function findAll(req, res) {
    try {
        if (req.query.name_uz) {
            let [data] = await db.query("SELECT * FROM category WHERE name_uz = ?", [req.query.name_uz])
            return res.send(data)
        } else if (req.query.name_ru) {
            let [data] = await db.query("SELECT * FROM category WHERE name_ru = ?", [req.query.name_ru])
            return res.send(data)
        }
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
    let { error, value } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        let { name_uz, name_ru } = req.body;
        let [order] = await db.query("INSERT INTO category(name_uz, name_ru, image) VALUES(?, ?, ?)",
            [name_uz, name_ru, req.file.filename]
        );
        res.status(201).send({ msg: "Created successfully!!!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik yuz berdi.");
    }
}


async function update(req, res) {
    try {
        let { id } = req.params
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let queryKey = keys.map((k) => k += " = ?")
        let updated = await db.query(`UPDATE category SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        console.log(id);
        let [data] = await db.query("select * FROM category WHERE id = ?", [id])
        console.log(data);
        await db.query("DELETE FROM category WHERE id = ?", [id])
        await fs.unlink(`./uploads/${data[0].image}`)
        res.send({ message: "deleted ✅" })
        return
    } catch (error) {
        console.log(error);
    }
};
async function pegination(req, res) {
    try {
        if (!take) {
            let pageNumber = parseInt(page, 10) || 0;
            let takeNumber = 10

            let offset = (pageNumber - 1) * takeNumber;
            let [get] = await db.query("select * from category limit ? OFFSET ? ", [takeNumber, offset])
            res.json({ data: get })
            return
        }
        let { page, take } = req.query
        let pageNumber = parseInt(page, 10) || 0;
        let takeNumber = parseInt(take, 10) || 10;

        let offset = pageNumber * takeNumber;
        let [get] = await db.query("select * from category limit ? OFFSET ? ", [takeNumber, offset])
        res.json({ data: get })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
export { findAll, findOne, create, update, remove, pegination }