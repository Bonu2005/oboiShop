import mysql from "mysql2/promise"

const db = await mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"0803",
    database:"oboiShop"
})
export default db 
