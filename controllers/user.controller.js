import db from "../config/db.js";
import api from "../models/axios.js";
import bcryptjs from "bcryptjs"
import otp from "otplib"
import { userValidation } from "../validations/user.validation.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config()

async function sendPhone(req, res) {
    try {
        let { phone } = req.body
        console.log(phone);

        console.log(`${process.env.OTP_SECRET} ${phone}`);
        
        let otp1 = otp.totp.generate(`${process.env.OTP_SECRET}${phone}`)
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
        console.log(`${process.env.OTP_SECRET} ${phone}`);
        
        let check = otp.totp.check(otp1, `${process.env.OTP_SECRET}${phone}`)
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

async function createAdmin(req, res) {
    try {
        let {phone ,fullName,password} = req.body
        let {value,error} = userValidation({phone,  fullName, password})
        if(error){
           return res.status(401).json({error:error.message})
        }
        let findAdmin = await db.query("select * from user where phone=?",[phone])
        if(!findUser.length){
          return  res.status(201).json({message: "User already registered"})
        }
        let hash = await bcryptjs.hash(password, 10)
        let [user] = await db.query("insert into user(phone,fullname,password,role) values(?,?,?,?)", [phone, fullName, hash, "admin"])
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
        let compare = await db.query("select * from user where password=?", [password])
        if (!compare.length) {
            return res.status(401).json({ message: "Wrong password" })
        }
        let token = jwt.sign({ id: userFind[0].id, phone: userFind[0].phone, role: userFind[0].role }, process.env.TOKEN)
        res.status(201).json({ token: token })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
async function pegination(req, res) {
    try {
        if(!take){
            let pageNumber = parseInt(page, 10) || 0;  
            let takeNumber =10
    
        let offset = (pageNumber-1) * takeNumber;
        let [get] = await db.query("select * from user limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        return
        }
        let {page,take}=req.query
        let pageNumber = parseInt(page, 10) || 0;  
        let takeNumber = parseInt(take, 10) || 10; 
    
        let offset = pageNumber * takeNumber;
        let [get] = await db.query("select * from user limit ? OFFSET ? ",[takeNumber,offset])
        res.json({data : get })
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};

async function update(req, res) {
    try {
        let { id } = req.params
        let keys = Object.keys(req.body)
        let values = Object.values(req.body)
        let queryKey = keys.map((k) => (k += " = ?"))
        let updated = await db.query(`UPDATE user SET ${queryKey.join(",")} WHERE id = ?`, [...values, id])
        res.send({ message: "updated ✅" })
    } catch (error) {
        console.log(error);
    }
};
async function remove(req, res) {
    try {
        let { id } = req.params
        await db.query("DELETE FROM user WHERE id = ?", [id])
        res.send({ message: "deleted ✅" })
    } catch (error) {
        console.log(error);
    }
};
export { sendPhone, verify, registr, login, createAdmin,update,remove,pegination}
