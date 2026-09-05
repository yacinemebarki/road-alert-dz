import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import mongoose from "mongoose";
import  User   from './model/user.js';
import bcrypt from "bcrypt";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Post from "./model/post.js";
import Alert from "./model/alert.js";
import multer from "multer";


const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
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
        res.cookie('pending_email', email, { httpOnly: true, sameSite: 'lax' });
        return res.json({
            success: true,
            message: message
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
        res.cookie('pending_email', email, { httpOnly: true, sameSite: 'lax' });

        return res.json({
            success: true,
            message: message
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
    const { user_code } = req.body;
    const email = req.cookies && req.cookies.pending_email;
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
            res.clearCookie('pending_email');
            res.cookie('user_email', email, { httpOnly: true, sameSite: 'lax' });

            return res.json({
                success: true,
                message: "Verification successful. Account created!"
            })
        }else{
            message = 'Verfication successful';
            res.clearCookie('pending_email');
            res.cookie('user_email', email, { httpOnly: true, sameSite: 'lax' });

            return res.json({
                success: true,
                message: message
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
async function add_post(title: string, description: string, location: string, image: Express.Multer.File){

    try{
        const newPost = new Post({
            title: title,
            description: description,
            location: location,   
            image: {
                data: image.buffer,
                contentType: image.mimetype
            } 
        })

        const savedPost = await newPost.save();
        return savedPost;
    }catch(err){
        console.log(err);
        return;
    }
    
}

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/add_post", upload.single('image'),async (req, res) => {
    const { title, description, location} = req.body;
    const email = req.cookies && req.cookies.user_email;

    try{

        if (!req.file) {
            return res.json({
                success: false,
                message: "No image uploaded"
            });
        }



        const post = await add_post(title, description, location, req.file);
        if (!post) {
            return res.json({
                success: false,
                message: "Failed to create post"
            });
        }
        console.log("the email is: ");
        console.log(email);
        if(!email){
            return res.json({ success: false, message: 'Not authenticated' });
        }

        const user = await User.findOne({ email: email});

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const alert = new Alert({
            user: user._id,
            post: post._id,
        })
        
        await alert.save();

        return res.json({
            success: true,
            message: "alert was created success"
        })


    }catch(err){
        console.log(err);
        return res.json({
            success: false,
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