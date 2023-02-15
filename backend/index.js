import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import mongConnection from './src/Connection/Mongo.js';
import userRoutes from './src/Routes/userRoutes.js';
import forRoutes from './src/Routes/formRoutes.js' 
import responseRoutes from './src/Routes/responseRoutes.js'

dotenv.config()
const app=Express();

const port=process.env.NODE_SERVER_PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

app.use('/user',userRoutes);
app.use('/form',forRoutes);
app.use('/response',responseRoutes)

app.get('/',(req,res)=>{
    res.send("welcome to api")
})

app.listen(port,(err)=>{
    if(err) console.log("Error :",err)

    else {
        console.log("App is starting on port 5000...")
        mongConnection();
    }
})
