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

async function createOrder(req, res) {
    let { error, value } = orderValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        let { user_id, total_price, products } = req.body;
        let [order] = await db.query("INSERT INTO orders(user_id, total_price) VALUES(?, ?)",
            [user_id, total_price]
        );
        const orderItemsPromises = products.map(async (p) => {
            const productArray = [p.product_id, p.total_count, p.total_price];
            await db.query(
                "INSERT INTO orderItem (product_id, total_count, total_price, order_id) VALUES (?, ?, ?, ?) ",
                [...productArray, order.insertId]
            );
        });
        await Promise.all(orderItemsPromises);
        res.status(201).send({ msg: "Created successfully!!!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik yuz berdi.");
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
export { getOneOrder, getOrder, createOrder, pegination }