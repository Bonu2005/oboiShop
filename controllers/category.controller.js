import db from "../config/db.js"
import { categorySchema } from "../validations/validations.js"

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
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        let { filename } = req.file
        let data = req.body
        let { value, error } = brandsSchema.validate(data)
        if (error) {
            res.status(400).json({ message: error.message })
            await fs.unlink(`./uploads/${filename}`)
            return
        }
        // let {id}=req.malumot
        let newOne = {
            ...data,
            image: filename,
            // owner:id
        }
        console.log(newOne.image);
        let createdProduct = await db.query("insert into category(name_uz, name_ru, image) values(?, ?, ?)",
            [newOne.name_uz, newOne.name_ru, newOne.image])
        console.log(createdProduct);
        res.status(200).send("Product successfully created!!!")
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