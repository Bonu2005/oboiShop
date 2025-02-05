import db from "../config/db.js";
import api from "../models/axios.js";
import bcryptjs from "bcryptjs"
import otp from "otplib"
import { userValidation } from "../validations/user.validation.js";
import jwt from "jsonwebtoken";
async function sendPhone(req, res) {
    try {
        let { phone } = req.body
        let otp1 = otp.totp.generate(`${process.env.OTP_SECRET} ${phone}`)
        res.status(200).json({ otp: otp1 })
        await sms(phone)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }

}
async function sms(phone) {
    try {
        let req = await api.post("/message/sms/send", {
            mobile_phone: phone,
            message: "Bu Eskiz dan test",
            from: "4546"

        })
    } catch (error) {
        console.log(error);

    }

}
async function verify(req, res) {
    try {
        let { otp1, phone } = req.params
        let check = otp.totp.check(otp1, `${process.env.OTP_SECRET} ${phone}`)
        if (!check) {
            return res.status(400).json({ message: "Not activated" })
        }
        return res.status(200).json({ message: "Successfully activated" })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }

}
async function registr(req, res) {
    try {
        let { phone, fullName, password } = req.body
        let { value, error } = userValidation({ phone, fullName, password })
        if (error) {
            return res.status(401).json({ error: error.message })
        }
        let findUser = await db.query("select * from user where phone=?", [phone])
        if (!findUser.length) {
            return res.status(201).json({ message: "User already registered" })
        }
        let hash = await bcryptjs.hash(password, 10)
        let [user] = await db.query("insert into user(phone,fullname,password,role) values(?,?,?,?)", [phone, fullName, hash, "user"])
        console.log(user);

        res.status(201).json({ message: "successfully registered" })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
async function login(req, res) {
    try {
        let { phone, password } = req.body
        let [userFind] = await db.query("select * from user where phone=?", [phone])
        console.log(userFind);

        if (!userFind.length) {
            return res.status(401).json({ message: "User not found" })
        }
        let compare = await bcryptjs.compare(password, userFind[0].password)
        if (!compare) {
            return res.status(401).json({ message: "Wrong password" })
        }
        let token = jwt.sign({ id: userFind[0].id, phone: userFind[0].phone }, process.env.TOKEN)
        res.status(201).json({ token: token })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }

}
export { sendPhone, verify, registr, login }