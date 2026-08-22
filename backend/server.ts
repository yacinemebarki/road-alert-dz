import express from "express";

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({ message: "from the backed" });
});

app.listen(3000, ()=>{
    console.log("server run on 3000");
})
