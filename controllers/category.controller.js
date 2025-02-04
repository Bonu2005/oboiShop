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
        let [data] = await db.query("SELECT * FROM category WHERE id = ?", [])
        res.send(data)
    } catch (error) {
        console.log(error);
    }
};
async function create(req, res) {
    try {

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