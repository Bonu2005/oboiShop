import db from "../config/db.js"
import { brandsSchema } from "../validations/validations.js"
import { promises as fs } from "fs"

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
        let createdProduct = await db.query("insert into brands(name_uz, name_ru, image) values(?, ?, ?)",
            [newOne.name_uz, newOne.name_ru, newOne.image])
        console.log(createdProduct);
        res.status(200).send("Brand successfully created!!!")
    } catch (error) {
        console.log(error);
    }
};
async function update(req, res) {
    try {
        let { id } = req.params
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let queryKey = keys.map((k) => k += " = ?")
        let updated = await db.query(`UPDATE brands SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        console.log(id);
        let [data] = await db.query("select * FROM brands WHERE id = ?", [id])
        console.log(data);
        await db.query("DELETE FROM brands WHERE id = ?", [id])
        await fs.unlink(`./uploads/${data[0].image}`)
        res.send({ message: "deleted ✅" })
        return
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