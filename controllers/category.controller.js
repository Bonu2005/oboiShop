import db from "../config/db.js"
import { categorySchema } from "../validations/validations.js"
import { promises as fs } from "fs"

async function findAll(req, res) {
    try {
        if (req.query.name_uz) {
            let [data] = await db.query("SELECT * FROM category WHERE name_uz = ?", [req.query.name_uz])
            return res.send(data)
        } else if (req.query.name_ru) {
            let [data] = await db.query("SELECT * FROM category WHERE name_ru = ?", [req.query.name_ru])
            return res.send(data)
        }
        let [data] = await db.query("SELECT * FROM category")
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.params
        let [data] = await db.query("SELECT * FROM category WHERE id = ?", [id])
        res.send(data[0])
    } catch (error) {
        console.log(error);
    }
};

// async function create(req, res) {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         let { filename } = req.file
//         let data = req.body
//         let { value, error } = categorySchema.validate(data)
//         if (error) {
//             res.status(400).json({ message: error.message })
//             await fs.unlink(`./uploads/${filename}`)
//             return
//         }
//         // let {id}=req.malumot
//         let newOne = {
//             ...data,
//             image: filename,
//             // owner:id
//         }
//         console.log(newOne.image);
//         let createdProduct = await db.query("insert into category(name_uz, name_ru, image) values(?, ?, ?)",
//             [newOne.name_uz, newOne.name_ru, newOne.image])
//         console.log(createdProduct);
//         const categoryItemsPromises = products.map(async (p) => {
//             const productArray = [p.product_id, p.total_count, p.total_price];
//             await db.query(
//                 "INSERT INTO orderItem (product_id, total_count, total_price, order_id) VALUES (?, ?, ?, ?) ",
//                 [...productArray, order.insertId]
//             );
//         });
//         await Promise.all(categoryItemsPromises);
//         res.status(201).send({ msg: "Created successfully!!!" });
//     } catch (error) {
//         console.log(error);
//     }
// };

async function create(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Fayl yuklanmadi' });
        }
        let { filename } = req.file;
        let data = req.body;
        let { value, error } = categorySchema.validate(data);
        if (error) {
            await fs.unlink(`./uploads/${filename}`);
            return res.status(400).json({ message: error.message });
        }
        let newCategory = {
            ...data,
            image: filename,
        };
        console.log('Yaratilgan rasim: ', newCategory.image);
        let createdCategory = await db.query(
            "INSERT INTO category(name_uz, name_ru, image) VALUES(?, ?, ?)",
            [newCategory.name_uz, newCategory.name_ru, newCategory.image]
        );
        console.log('Kategoriyani yaratish: ', createdCategory);
        let productIds = data.products.map(p => p.product_id);
        const categoryItemPromises =
            productIds.map(async (productId) => {
                let categoryItem = {
                    category_id: createdCategory.insertId,
                    product_id: productId,
                };
                await db.query(
                    "INSERT INTO categoryItem(category_id, product_id) VALUES(?, ?)",
                    [categoryItem.category_id, categoryItem.product_id]
                );
            });
        await Promise.all(categoryItemPromises);
        res.status(201).send({ msg: "Muvaffaqiyatli yaratildi!" });

    } catch (error) {
        console.log('Xatolik yuz berdi:', error.message);
        res.status(500).send("Serverda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
}



async function creafvte(req, res) {
    let { error, value } = categorySchema.validate(req.body);
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


async function update(req, res) {
    try {
        let { id } = req.params
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let queryKey = keys.map((k) => k += " = ?")
        let updated = await db.query(`UPDATE category SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        console.log(id);
        let [data] = await db.query("select * FROM category WHERE id = ?", [id])
        console.log(data);
        await db.query("DELETE FROM category WHERE id = ?", [id])
        await fs.unlink(`./uploads/${data[0].image}`)
        res.send({ message: "deleted ✅" })
        return
    } catch (error) {
        console.log(error);
    }
};
async function pegination(req, res) {
    try {
        if (!take) {
            let pageNumber = parseInt(page, 10) || 0;
            let takeNumber = 10

            let offset = (pageNumber - 1) * takeNumber;
            let [get] = await db.query("select * from category limit ? OFFSET ? ", [takeNumber, offset])
            res.json({ data: get })
            return
        }
        let { page, take } = req.query
        let pageNumber = parseInt(page, 10) || 0;
        let takeNumber = parseInt(take, 10) || 10;

        let offset = pageNumber * takeNumber;
        let [get] = await db.query("select * from category limit ? OFFSET ? ", [takeNumber, offset])
        res.json({ data: get })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
export { findAll, findOne, create, update, remove, pegination }