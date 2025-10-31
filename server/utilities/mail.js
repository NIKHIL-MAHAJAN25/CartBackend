const nodemailer=require('nodemailer')
let email=process.env.email
let password=process.env.password
module.exports={
    sendOtpMail,
    sendWelcome,
    
}
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:email,
        pass:password
    }
});
async function acceptMail(params){
    const mailContent=`<p>Your Ride has been Accepted<br/> <br/>
    Congratulations your ride has been accepted,kindly Proceed to your Pickup Point <br/> <br/>
    Regards,<br/>
    App management Team!!</p>`
    const message={
        from:'Nikhil Mahajan',
        to:params.userEmail,
        subject:"Welcome Message",
        html:mailContent,
    }
    try{
        await transporter.sendMail(message)
        console.log("Mail sent")
    }catch(err){
        console.log("Error sending mail:"+err);
    }
}
async function sendOrderConfirm(params){
    const mailContent=`<p>Order Confirmation <br/> <br/>
    Thanks for Ordering from our app,Your order is confirmed<br/> <br/>
    Regards,<br/>
    App management Team!!</p>`
    const message={
        from:'Nikhil Mahajan',
        to:params.userEmail,
        subject:"Order Confirmation Message",
        html:mailContent,
    }
    try{
        await transporter.sendMail(message)
        console.log("Mail sent")
    }catch(err){
        console.log("Error sending mail:"+err);
    }
}
