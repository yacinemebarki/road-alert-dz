import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({ message: "from the backed" });
});

app.listen(3000, ()=>{
    console.log("server run on 3000");
})

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

app.post("/api/verfy",async (req, res) => {
    const email = req.body;
    const subject = "your verfication code";
    let code = generate_number();
    let text = code.toString();

    await sent_verfication_email(email, subject, text);

    res.json({
        success: true,
        code: code
    })
})

