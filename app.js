const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/insert', (request, response) => {
    const { username, password } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(username, password);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

async function sendEmail(email, name,cart,subtotal) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'galleryglipmse@gmail.com',
                pass: 'tunn ojdz gpap kfly'
            }
        });

        let tableHtml = `
            <table border="1" cellpadding="10">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
        `;
        cart.forEach(item => {
            tableHtml += `
                <tr>
                   <td><img src="../frontend/${item.imageLink}" alt="" width="150" height="150" class="CToWUd" data-bit="iit" jslog="138226; u014N:xr6bB; 53:WzAsMl0."></td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                </tr>
            `;
        });
        tableHtml += `
                </tbody>
            </table>
        `;

        let mailOptions = {
            from: 'galleryglipmse@gmail.com',
            to: email,
            subject: 'Order Summary',
            html: `<p>Dear ${name},</p>
                   <p>Thank you for your order. Here is your order summary:</p>
                   ${tableHtml}
                   ${subtotal}
                   <p>Best regards,<br>Gallery Glimpse</p>`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        throw error;
    }
}

app.post('/sendEmail', (req, res) => {
    const { name, email,cart,subtotal } = req.body;
    console.log("email " + email + " name " + name);
    sendEmail(email, name, cart,subtotal)
        .then(() => {
            res.status(200).json({ message: 'Email sent successfully' });
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        });
});

app.post('/insertCustomer', (request, response) => {
    const { name, phone, email, address } = request.body;
    const db = dbService.getDbServiceInstance();
    console.log(name);
    const result = db.insertNewCustomer(name, phone, email, address);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.post('/insertItem', (request, response) => {
    const { image_link, name, artists, price } = request.body;
    const db = dbService.getDbServiceInstance();
    console.log(name);
    const result = db.insertNewPainting(image_link, name, artists, price);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/getAllEvents', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllEventsData();
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.post('/login', async (request, response) => {
    try {
    const { username, password } = request.body;
    //console.log("n "+username);
    //console.log("p "+password);
    const db = dbService.getDbServiceInstance();
        const isValidLogin = await db.validateLogin(username, password);
        console.log("app "+isValidLogin);
        response.json({ isValidLogin: isValidLogin !== null, username: isValidLogin });
    } catch (error) {
        console.error("hello "+error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/updateQuantityDB', (request, response) => {
    const { name, quantity } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateQuantityById(name, quantity);
    console.log("update quantity" + quantity);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

app.delete('/delete/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowByName(name);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();
    console.log("app.js " + name);

    db.searchByName(name)
        .then(result => {
            console.log("result quantity " + result);
            console.log("app data quantity " + { data: result });
            response.json({ data: result });

        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(process.env.PORT, () => console.log('app is running'));