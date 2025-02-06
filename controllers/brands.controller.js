import db from "../config/db.js"
import { brandsSchema } from "../validations/validations.js"

async function findAll(req, res) {
    try {
        if (req.query.name_uz) {
            let [data] = await db.query("SELECT * FROM brands WHERE name_uz = ?", [req.query.name_uz])
            return res.send(data)
        } else if (req.query.name_ru) {
            let [data] = await db.query("SELECT * FROM brands WHERE name_ru = ?", [req.query.name_ru])
            return res.send(data)
        }
        let [data] = await db.query("SELECT * FROM brands")
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.params
        let [data] = await db.query("SELECT * FROM brands WHERE id = ?", [id])
        res.send(data[0])
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {
        let { error, value } = brandsSchema.validate(req.body)
        if (error) {
            return res.send({ validateError: error.details[0].message });
        }
        let { name_uz, name_ru } = req.body
        if (!req.file.filename) {
            return res.status(400).send({ message: "Rasm yuklang!" });
        }
        let { filename } = req.file
        let [newItem] = await db.query("INSERT INTO brands (name_uz, name_ru, image) VALUES (?, ?, ?)", [name_uz, name_ru, filename])
        if (newItem.affectedRows == 0) {
            return res.status(400).send({ message: "not created ❌" })
        }
        let [item] = await db.query("SELECT * FROM brands WHERE id = ?", [newItem.insertId])
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
        let updated = await db.query(`UPDATE brands SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        await db.query("DELETE FROM brands WHERE id = ?", [id])
        res.send({ message: "deleted ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function pegination(req, res) {
    try {
        let {page,take}=req.query
        if(!take){
            let pageNumber = parseInt(page, 10) || 0;  
            let takeNumber =10
    
        let offset = (pageNumber-1) * takeNumber;
        let [get] = await db.query("select * from brands limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        return
        }
        
        let pageNumber = parseInt(page, 10) || 0;  
        let takeNumber = parseInt(take, 10) || 10; 
    
        let offset = (pageNumber-1) * takeNumber;
        let [get] = await db.query("select * from brands limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};
export { findAll, findOne, create, update, remove ,pegination}