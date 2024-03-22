import express from 'express';
import  connectDb  from './config/mongodb.js';
import router from './routes/routes.js'
import dotenv from'dotenv';
import cookieparser from 'cookie-parser';
import expresslayout from 'express-ejs-layouts';
import{fileURLToPath} from 'url';
import path from 'path';

dotenv.config();
connectDb();

const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
const Port= process.env.PORT ||8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(expresslayout);

app.use(express.static(path.join(__dirname,"public")));
app.set("layout",__dirname+"/views/main")
app.set('view engine','ejs');

app.use('/',router);

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});


