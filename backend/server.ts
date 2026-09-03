import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import mongoose from "mongoose";
import  User   from './model/user.js';
import bcrypt from "bcrypt";
import cors from 'cors';
import Post from "./model/post.js";
import Alert from "./model/alert.js";


const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());
app.get("/api/test", (req, res) => {
    res.json({ message: "from the backed" });
});


//backend and data base connection
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

connectDb();


//email verfication
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


async function sent_verfication_email(to: string){
    try {  
        let code = generate_number();
        codes.set(to, code);       
        let text = code.toString();
        const subject = "your verfication code";
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            text: text
        })
        return code;
    }catch(err){
        console.log(err);
    }
}


//sign and sign up
const sign_up_data = new Map();
const codes = new Map();

app.post("/api/sign_up", async (req, res) => {
    const { user_name, email, password} = req.body;
    console.log(user_name);
    let message = "";
    try{  
        let exist = await User.findOne({ email: email});
        console.log(exist);
        if(exist){
            message = "user with that email already exist";
            console.log(message);
            return res.json({
                success: false,
                message: message
            })
        }

        let new_user = true;

        sign_up_data.set(email, { user_name, password, new_user});
        message = "wait for verfication";
        console.log(message);

        await sent_verfication_email(email);
        return res.json({
            success: true,
            message: message,
            email: email
        })
    }catch(err){
        message = "somthing went wrong";
        return res.json({
            success: false,
            message: message
        })
    }
    
})

app.post("/api/sign_in", async (req, res) => {
    const { email, password } = req.body;
    let message = '';

    try{

        const user = await User.findOne({ email: email });
        if(!user){
            message = "Invalid email or password";
            return res.json({
                success: false,
                message: message,
                email: email
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            message = "invalid email or password";
            return res.json({
                success: false,
                message: message,
                email: email
            })
        }
        await sent_verfication_email(email);
        message = "wait for verfication code";
        let new_user = false;
        const user_name = user.name;
        sign_up_data.set(email, { user_name, password, new_user});

        return res.json({
            success: true,
            message: message,
            email: email
        })
        
    }catch(err){
        console.log(err);
        message = "somthing went wrong";
        return res.json({
            success: false,
            message: message,
            email: email
        })
    }
})

app.post("/api/verfy",async (req, res) => {
    console.log("in verfy")
    const { email, user_code } = req.body;
    let message = "";
    console.log(email);       

    try{  
        let code = codes.get(email);
        console.log(code);       
        if( user_code != code){
            message = "wrong verfication code";
            return res.json({
                success: false,
                message: message
            })
        }
        const userData = sign_up_data.get(email);

        if(!userData){
            message = "data not be saved";
            return res.json({
                success: false,
                message: message
            })
        }
        if(userData.new_user == true){
            const hashPassword = await bcrypt.hash(userData.password, 10);
            const newUser = new User({
                name: userData.user_name,
                email: email,
                password: hashPassword              
            })
            console.log("user created");
            await newUser.save();
            console.log("user been add to the data base ")
            sign_up_data.delete(email);

            return res.json({
                success: true,
                message: "Verification successful. Account created!"
            })
        }else{
            message = 'Verfication successful';
            return res.json({
                success: true,
                message: message,
                email: email,
            })
        }

        
    }catch(err){
        message = "somthing went wrong";
        console.log(err);
    
        return res.json({
            succes: false,
            message: message
        })
    }


})


//post manger
async function add_post(title: string, description: string, location: string, image: File){

    try{
        const newPost = new Post({
            title: title,
            descrtiption: description,
            location: location,   
            image: image    
        })

        const savedPost = await newPost.save();
        return savedPost;
    }catch(err){
        console.log(err);
        return;
    }
    
}

app.post("/api/add_post", async (req, res) => {
    const { email, title, descrtiption, location, image} = req.body;

    try{

        const post = await add_post(title, descrtiption, location, image);
        if (!post) {
            return res.json({
                success: false,
                email: email,
                message: "Failed to create post"
            });
        }
        const user = await User.findOne({ email: email});

        if (!user) {
            return res.json({
                success: false,
                email: email,
                message: "User not found"
            });
        }

        const alert = new Alert({
            user: user._id,
            post: post._id,
            view: false
        })
        
        await alert.save();

        return res.json({
            success: true,
            email: email,
            message: "alert was created success"
        })


    }catch(err){
        return res.json({
            success: false,
            email: email,
            message: "somthing went wrong",
        })
    }
})

app.get("/api/dashboard_posts", async (req, res) => {
    try{
        const alerts = await Alert.find({ view: { $in: ["New", "Update" ]} }).populate("user", "email").populate("post");

        return res.json({
            success: true,
            message: "alert was found",
            alerts: alerts          
        })
        
    }catch(err){
        return res.json({
            success: false,
            message: "somthing went wrong",
            alerts: []
        })
    }
})