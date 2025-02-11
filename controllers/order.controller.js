import e from "express";
import db from "../config/db.js";
import { orderValidation } from "../validations/order.validation.js";

async function getOrder(req, res) {
    try {
        let [order] = await db.query("select * from orders inner join orderItem on orders.id = orderItem.order_id inner join product on product.id = orderItem.product_id")
        res.status(200).send(order)
    } catch (error) {
        console.log(error.message);
    }
}
async function getOneOrder(req, res) {
    try {
        let { id } = req.params
        let [order] = await db.query("select * from orders inner join orderItem on orders.id = orderItem.order_id inner join product on product.id = orderItem.product_id where orders.id=?", [id])
        res.status(200).send(order)
    } catch (error) {
        console.log(error.message);
    }
}
async function create(req, res) {
    try {
        let { error } = orderValidation(req.body);
        if (error) {
            console.log(error);
            return res.status(422).send({ message: error.details[0].message });
        }
        let { total_price, user_id, products } = req.body;
        let [created] = await db.query(
            "INSERT INTO orders (total_price, user_id) VALUES(?, ?)",
            [total_price, user_id]
        );
        if (!products || products.length === 0) {
            return res.status(400).send({ message: "Products cannot be empty." });
        }
        for (let prd of products) {
            try {
                await db.query(
                    "INSERT INTO orderItem (order_id, product_id, total_count, total_price) VALUES(?, ?, ?, ?)",
                    [created.insertId, prd.product_id, prd.total_count, prd.total_price]
                );
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        }
        let [found] = await db.query("SELECT * FROM orders WHERE id = ?", [
            created.insertId,
        ]);
        res.status(201).send({ data: found[0] });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function pegination(req, res) {
    try {
        if (!take) {
            let pageNumber = parseInt(page, 10) || 0;
            let takeNumber = 10
            let offset = (pageNumber - 1) * takeNumber;
            let [get] = await db.query("select * from order limit ? OFFSET ? ", [takeNumber, offset])
            res.json({ data: get })
            return
        }
        let { page, take } = req.query
        let pageNumber = parseInt(page, 10) || 0;
        let takeNumber = parseInt(take, 10) || 10;

        let offset = pageNumber * takeNumber;
        let [get] = await db.query("select * from order limit ? OFFSET ? ", [takeNumber, offset])
        res.json({ data: get })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
export { getOneOrder, getOrder, create, pegination }
