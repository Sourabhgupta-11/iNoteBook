const express=require('express');
var cors=require('cors')            //cross origin resource sharing so that resource can be shared from port 5000 to 3000
const app=express();
const db=require('./db');

const bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(cors());

const userRoutes=require('./routes/auth.js')
const notesRoutes=require('./routes/notes.js')

app.get('/',(req,res)=>{
    res.send("Hello users");
})

app.use('/api/auth',userRoutes)
app.use('/api/notes',notesRoutes)

app.listen(5000,()=>{
    console.log("listening on Port 5000");
});
