const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/contactform.html');
});

app.post('/', (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testpixelreality@gmail.com',
            pass: 'test1234'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'testpixelreality@gmail.com',
        subject: `Messa from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email send' + info.response)
            res.send('success')
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
