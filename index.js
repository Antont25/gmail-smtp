const express = require('express')
const app = express()

const cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json())

const  user = process.env.USER || '';
const  pass = process.env.PASS || '';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user ,
        pass: pass
    }
});

app.post('/sendMessage', async (req, res) => {

    const {name,email,message}=req.body

    await transporter.sendMail({
        from: 'HR message',
        to: 'a.tolkachev.dev@gmail.com',
        subject: 'HR WANTS ME',
        html: `<div>
<div>name: ${name}</div>
<div>email: ${email}</div>
<div>message: ${message}</div>
</div>`
    })


res.send('ok')
})

const  port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})