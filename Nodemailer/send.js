var nodemailer = require('nodemailer');
var express=require("express");
var app=express();
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/mail.html")
})
app.get("/getdata",(req,res)=>{
    var response=req.query;
    let protocol = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: response.user,
            pass: response.pass
        },
    })
    let Mail = {
        from: response.user,
        to: response.email,
        // to:'prakash18@navgurukul.org',
        subject: response.sub,
        text: response.body

    }
    protocol.sendMail(Mail, (error, info) =>{
        if(error){
            return console.log(error);
            res.send("Error 404 Not found")
        } else {
            console.log("The Mail sending succcessfuly......")
            console.log(Mail);
            res.sendFile(__dirname+"/mail.html")
            
        }
    })
});
app.listen(1234)