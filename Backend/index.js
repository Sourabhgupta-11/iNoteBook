const express=require('express');
var cors=require('cors')            //cross origin resource sharing so that resource can be shared from port 5000 to 3000
const app=express();
const db=require('./db');
require('dotenv').config();

const port = process.env.PORT|| 4000 

const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001','https://i-note-book-lime.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const userRoutes=require('./routes/auth.js')
const notesRoutes=require('./routes/notes.js')

app.get('/',(req,res)=>{
    res.send("Hello users");
})

app.use('/api/auth',userRoutes)
app.use('/api/notes',notesRoutes)

app.listen(port,()=>{
    console.log(`listening on Port ${port}`);
});
