import db from "../config/db.js"
import { productValidation } from "../validations/product.validation.js";

async function getAllProducts(req, res){
    try {
        let [products] = await db.query("select * from product")
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneProduct(req, res){
    try {
        let {id} = req.params
        let [product] = await db.query("select * from product where id=?", [id])
        res.status(200).send(product)
    } catch (error) {
        console.log(error.message);
    }
}

async function createProduct(req, res){
    let {error, value} = productValidation(req.body)
    if(error){
       return res.status(400).send({msg: error.details[0].message})
    }

    try {
        let {name_uz, name_ru, brand_id, country_id, price,  old_price, available, decription_uz, decription_ru, washable, size} = req.body
        let createdProduct = await db.query("insert into product(name_uz, name_ru, brand_id, country_id, price,  old_price, available, decription_uz, decription_ru, washable, size) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [name_uz, name_ru, brand_id, country_id, price,  old_price, available, decription_uz, decription_ru, washable, size])
        res.status(200).send("Product successfully created!!!")
    } catch (error) {
        console.log(error.message);
    }
}

async function updateProduct(req, res){
    let {error, value} = productValidation(req.body)
    if(error){
       return res.status(400).send({msg: error.details[0].message})
    }
    
    try {
        let {id} = req.params
        let value = req.body
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " =?"))
        let result = await db.query(`update products set ${queryKey.join(",")} where id=?`, [...values, id])
        res.status(200).json({message: "Successfully updated!!!"})
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteProduct(req, res){
    try {
        let {id} = req.params
        let deletedProduct = await db.query("delete from products where id=?", [id])
        res.status(200).send("Product successfully deleted!!!")
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductsByCountry(req, res){
    try {
       let {id} = req.params
       let [products] = await db.query("select * from products where id=?", [id]) 
       res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductsByCategory(req, res){
    try {
        let {id} = req.params
        let [products] = await db.query("select * from products where id = ?", [id])
        res.status(200).send(products)
    } catch (error) {
        console.log(error.message);
    }
}

async function getProductsByBrend(req, res){
    try {
        let {id} = req.params
        let [products] = await db.query("select * from products where id = ?", [id])
    } catch (error) {
        console.log(error.message);
    }
}

export {getAllProducts, getOneProduct, createProduct, updateProduct, getProductsByBrend, getProductsByCategory, getProductsByCountry, deleteProduct}