import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import mongoose from "mongoose";
import  User   from './model/user.js';
import bcrypt from "bcrypt";


const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({ message: "from the backed" });
});

app.listen(3000, ()=>{
    console.log("server run on 3000");
})

export async function connectDb(){
    try{
        await mongoose.connect(process.env.URI!);
    }catch(err){
        console.log(err);
    }
}

function generate_number() {
    let min = 9
    let max = 100
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

async function sent_verfication_email(to: string, subject: string, text: string){
    try {  
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            text: text
        })
    }catch(err){
        console.log(err);
    }
}

const sign_up_data = new Map();

app.post("api/sign_up", async (req, res) => {
    const { user_name, email, password} = req.body;
    let message = "";
    try{  
        let exist = await User.findOne({ email: email});

        if(exist){
            message = "user with that email already exist";

            return res.json({
                succes: false,
                message: message
            })
        }

        let new_user = true;

        sign_up_data.set(email, { user_name, password, new_user});
        message = "wait for verfication";

        return res.json({
            succes: true,
            message: message,
            email: email
        })
    }catch(err){
        message = "somthing went wrong";
        return res.json({
            succes: false,
            message: message
        })
    }
    
})

app.post("/api/verfy",async (req, res) => {
    const { email, user_code } = req.body;
    let message = "";

    try{  
        const subject = "your verfication code";
        let code = generate_number();
        let text = code.toString();

        await sent_verfication_email(email, subject, text);

        if( user_code != code){
            message = "wrong verfication code";
            return res.json({
                succes: false,
                message: message
            })
        }
        const userData = sign_up_data.get(email);

        if(!userData){
            message = "data not be saved";
            return res.json({
                succes: false,
                message: message
            })
        }
        if(userData.new_user == true){
            const hashPassword = await bcrypt.hash(userData.password, 10);
            const newUser = new User({
                name: userData.user_name,
                email: email,
                password: userData.password                
            })
            await newUser.save()
            sign_up_data.delete(email)

            return res.json({
                success: true,
                message: "Verification successful. Account created!"
            })
        }

        
    }catch(err){
        message = "somthing went wrong";
    
        return res.json({
            succes: false,
            message: message
        })
    }


})

