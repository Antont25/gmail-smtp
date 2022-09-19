const express = require('express')
const app = express()
const port = 3002

const cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'a.tolkachev.dev@gmail.com',
        pass: 'kzeomhlawaakfhya' // naturally, replace both with your real credentials or an application-specific password
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})