import db from "../config/db.js";
import { orderItemValidation } from "../validations/orderItem.validation.js";

async function getOrderItems(req, res){
    try {
        let [orderItems] = await db.query("select * from orderItem")
        res.status(200).send(orderItems)
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneOrderItem(req, res){
    try {
        let {id} = req.params
        let [orderItem] = await db.query("select * from orderItem where id=?", [id])
        res.status(200).send(orderItem)
    } catch (error) {
        console.log(error.message);
    }
}

async function createOrderItem(req, res){
    let {error, value} = orderItemValidation(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    try {
        let {product_id, order_id, total_count, total_price} = req.body
        let [createdOrderItem] = await db.query("insert into orderItem(product_id, order_id, total_count, total_price) values(?, ?, ?, ?)",
        [product_id, order_id, total_count, total_price]
        )
        res.status(201).send({msg: "Created successfully!!!"})
    } catch (error) {
        console.log(error.message);
    }
}

async function updateOrderItem(req, res){
    try {
        let {id} = req.params
        let value = req.body
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " =?"))
        let result = await db.query(`update orderItem set ${queryKey.join(",")} where id=?`, [...values, id])
        res.status(200).json({message: "Successfully updated!!!"})
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteOrderItem(req, res){
    try {
        let {id} = req.params
        let deletedProduct = await db.query("delete from orderItem where id=?", [id])
        res.status(200).send("Order item successfully deleted!!!")
    } catch (error) {
        console.log(error.message);
    }
}

export {getOneOrderItem, getOrderItems, createOrderItem, updateOrderItem, deleteOrderItem}