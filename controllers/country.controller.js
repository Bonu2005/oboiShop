import db from "../config/db.js"
import { countrySchema } from "../validations/validations.js"

async function findAll(req, res) {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        let offset = (page - 1) * limit;
        if (req.query.name_uz) {
            let [data] = await db.query("SELECT * FROM country WHERE name_uz = ? LIMIT ? OFFSET ?", [req.query.name_uz, limit, offset]);
            return res.send(data);
        } else if (req.query.name_ru) {
            let [data] = await db.query("SELECT * FROM country WHERE name_ru = ? LIMIT ? OFFSET ?", [req.query.name_ru, limit, offset]);
            return res.send(data);
        }
        let [data] = await db.query("SELECT * FROM country LIMIT ? OFFSET ?", [limit, offset]);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

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
        let queryKey = keys.map((k) => (k += " = ?"))
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
async function pegination(req, res) {
    try {
        if(!take){
            let pageNumber = parseInt(page, 10) || 0;  
            let takeNumber =10
    
        let offset = (pageNumber-1) * takeNumber;
        let [get] = await db.query("select * from country limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        return
        }
        let {page,take}=req.query
        let pageNumber = parseInt(page, 10) || 0;  
        let takeNumber = parseInt(take, 10) || 10; 
    
        let offset = pageNumber * takeNumber;
        let [get] = await db.query("select * from country limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};
export { findAll, findOne, create, update, remove,pegination }