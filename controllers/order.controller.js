import db from "../config/db.js";
import { orderValidation } from "../validations/order.validation.js";

async function getOrder(req, res){
    try {
        let [orderItems] = await db.query("select * from orders")
        res.status(200).send(orderItems)
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneOrder(req, res){
    try {
        let {id} = req.params
        let [order] = await db.query("select * from orders where id=?", [id])
        res.status(200).send(order)
    } catch (error) {
        console.log(error.message);
    }
}

async function createOrder(req, res){
    let {error, value} = orderValidation(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    try {
        let {total_count, total_price} = req.body
        let [createdOrder] = await db.query("insert into orders(total_count, total_price) values(?, ?)",
        [total_count, total_price]
        )
        res.status(201).send({msg: "Created successfully!!!"})
    } catch (error) {
        console.log(error.message);
    }
}

async function updateOrder(req, res){
    try {
        let {id} = req.params
        let value = req.body
        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " =?"))
        let result = await db.query(`update order set ${queryKey.join(",")} where id=?`, [...values, id])
        res.status(200).json({message: "Successfully updated!!!"})
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteOrder(req, res){
    try {
        let {id} = req.params
        let deletedProduct = await db.query("delete from order where id=?", [id])
        res.status(200).send("Order successfully deleted!!!")
    } catch (error) {
        console.log(error.message);
    }
}

export {getOneOrder, getOrder, createOrder, updateOrder, deleteOrder}