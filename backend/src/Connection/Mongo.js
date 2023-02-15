import mongoose from "mongoose";


import dotenv from 'dotenv';



const mongConnection=()=>{
const conn_url=process.env.MONGO_DB_LINK;

    console.log(conn_url)
    mongoose.connect(conn_url, {
    useNewUrlParser: "true",
    })


    mongoose.connection.on("error", err => {
    console.log("err", err)
    })


    mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
    })
}

export default mongConnection;