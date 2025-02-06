import db from "../config/db.js";
import { skidkaSchema } from "../validations/validations.js";

async function skidka(req, res) {
    try {
        let { error, value } = skidkaSchema.validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        let { product_id, discount } = req.body
        console.log(product_id);
        console.log(discount);
        
        await db.query("insert into sales(product_id, discount) values(?, ?)", [product_id, discount])
        await db.query("update product set old_price = price where id = ?", [product_id])
        await db.query("update product set price = old_price-(old_price / 100 * ?) where id = ?", [discount, product_id])
        res.send("Discount done ✅")
    } catch (error) {
        console.log(error);
    }
};

async function productsOnDiscount(req, res) {
    try {
        const [prds] = await db.query(`
                SELECT p.id, p.name_uz, p.name_ru, p.price, p.old_price, s.discount
                FROM sales s
                JOIN product p ON s.product_id = p.id
                WHERE s.discount IS NOT NULL
        `);
        if (prds.length > 0) {
            res.status(200).send(prds);
        } else {
            res.status(404).send({ message: "Chegirma bo'lgan mahsulotlar topilmadi." });
        }
    } catch (error) {
        console.log(error);
    }
}

export { skidka, productsOnDiscount }