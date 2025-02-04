async function findAll(req, res) {
    try {
        let [data] = await db.query("SELECT * FROM category")
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function findOne(req, res) {
    try {
        let { id } = req.query
        let [data] = await db.query("SELECT * FROM category WHERE id = ?", [id])
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {
        let { name_uz, name_ru, image } = req.body
        let [newItem] = await db.query("INSERT INTO category (name_uz, name_ru, image) VALUES (?, ?, ?)", [name_uz, name_ru, image])
        if (newItem.affectedRows == 0) {
            res.send("not created")
            return
        }
        let [item] = await db.query("SELECT * FROM category WHERE id = ?", [newItem.insertId])
        res.json(item[0])
    } catch (error) {
        console.log(error);
    }
};
async function update(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {

    } catch (error) {
        console.log(error);
    }
};

export { findAll, findOne, create, update, remove }