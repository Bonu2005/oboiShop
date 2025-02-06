import db from "../config/db.js";
import { orderValidation } from "../validations/order.validation.js";

async function getOrder(req, res){
    try {
        let [order] = await db.query("select * from orders inner join orderItem on orders.id = orderItem.order_id inner join product on product.id = orderItem.product_id")
        res.status(200).send(order)
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneOrder(req, res){
    try {
        let {id} = req.params
        let [order] = await db.query("select * from orders inner join orderItem on orders.id = orderItem.order_id inner join product on product.id = orderItem.product_id where orders.id=?", [id])
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
        let {user_id, total_price} = req.body
        let [createdOrder] = await db.query("insert into orders(user_id, total_price) values(?, ?)",
        [user_id, total_price]
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
async function pegination(req, res) {
    try {
        if(!take){
            let pageNumber = parseInt(page, 10) || 0;  
            let takeNumber =10
    
        let offset = (pageNumber-1) * takeNumber;
        let [get] = await db.query("select * from order limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        return
        }
        let {page,take}=req.query
        let pageNumber = parseInt(page, 10) || 0;  
        let takeNumber = parseInt(take, 10) || 10; 
    
        let offset = pageNumber * takeNumber;
        let [get] = await db.query("select * from order limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};
export {getOneOrder, getOrder, createOrder, updateOrder, deleteOrder,pegination}