import db from "../config/db.js"
import { productValidation } from "../validations/product.validation.js";
import { promises as fs}  from "fs"
async function getAllProducts(req, res) {
    try {
        let [products] = await db.query("select * from product")
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}


async function getProductsFilterByPrice(req, res){
    try {
        let {from, to} = req.query
        let [products] = await db.query(`select * from product where price between ${from} and ${to}`)
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductIsMaxPrice(req, res){
    try {
        let [product] = await db.query("select * from product order by price DESC LIMIT 1")
        res.status(200).send(product)
    } catch (error) {
        console.log(error);
    }
}

async function getProductIsMinPrice(req, res){
    try {
        let [product] = await db.query("select * from product order by price LIMIT 1")
        res.status(200).send(product)
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneProduct(req, res) {
    try {
        let { id } = req.params
        let [product] = await db.query("select * from product where id=?", [id])
        res.status(200).send(product)
    } catch (error) {
        console.log(error.message);
    }
}


async function createProduct(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        let {filename}=req.file
        let data=req.body
        let {value,error}=productValidation(data)
        if(error){
            
            res.status(400).json({message:error.message})
            await fs.unlink(`./uploads/${filename}`) 
            return
        }
        // let {id}=req.malumot
        let newOne={
           
            ...data,
            image:filename,
            // owner:id
           
        }
        
        console.log(newOne.image);
        
        let createdProduct = await db.query("insert into product(name_uz, name_ru, brand_id, country_id, price,  old_price, available, decription_uz, decription_ru, washable, size, image) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [newOne.name_uz, newOne.name_ru, newOne.brand_id, newOne.country_id, newOne.price, newOne.old_price, newOne.available, newOne.decription_uz, newOne.decription_ru, newOne.washable, newOne.size, newOne.image])
            console.log(createdProduct);
        
            
        res.status(200).send("Product successfully created!!!")
    } catch (error) {
         
        res.status(400).send({error:error.message})
    }
}

async function updateProduct(req, res) {
    let { error, value } = productValidation(req.body)
    if (error) {
        return res.status(400).send({ msg: error.details[0].message })
    }
    try {
        let { id } = req.params
        let value = req.body
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " =?"))
        let result = await db.query(`update products set ${queryKey.join(",")} where id=?`, [...values, id])
        res.status(200).json({ message: "Successfully updated!!!" })
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteProduct(req, res) {
    try {
        let { id } = req.params
        console.log(id);
        let [data] = await db.query("select * FROM products WHERE id = ?", [id])
        console.log(data);
        await db.query("DELETE FROM products WHERE id = ?", [id])
        await fs.unlink(`./uploads/${data[0].image}`)
        res.send({ message: "deleted ✅" })
        return
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductsByCountry(req, res) {
    try {
        let { id } = req.params
        let [products] = await db.query("select * from product where country_id=?", [id])
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductsByCategory(req, res) {
    try {
        let { id } = req.params
        let [products] = await db.query("select * from product where category_id = ?", [id])
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductsByBrend(req, res) {
    try {
        let { id } = req.params
        let [products] = await db.query("select * from product where brand_id = ?", [id])
        console.log(products);
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

export { getAllProducts, getOneProduct, createProduct, updateProduct, getProductsByBrend, getProductsByCountry, deleteProduct, getProductsByCategory, getProductIsMaxPrice, getProductIsMinPrice, getProductsFilterByPrice }
