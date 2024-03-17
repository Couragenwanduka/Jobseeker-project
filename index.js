import express from 'express';
import  connectDb  from '../src/config/mongodb.js';
import router from '../src/routes/routes.js'
import dotenv from'dotenv';


dotenv.config();
connectDb();

const Port= process.env.PORT ||5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',router);

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});


